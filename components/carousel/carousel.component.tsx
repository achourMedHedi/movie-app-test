import React from "react";
import { TProps, TState } from "./carousel.types";
import Image from 'next/image'
import { CarouselContainer, CarouselItem, SwitchArrow, CarouselItemsContainer, styles, CarouselItemTitle, MobileStepsContainer, MobileStep } from "./carousel.styles";
import { TMovie, TTvShows } from "../../pagesTypes/home.types";
import SquareLoading from "../squareLoading/SquareLoading.component";


class Carousel extends React.Component<TProps, TState> {

    constructor(props: TProps) {
        super(props)
        this.state = {
            activeIndex: 0,
            mobileCarouselStartTouchPosition: 0,
            mobileCarouselMoveTouchPosition: 0,
            activeTab: "movies"
        }

    }


    static getDerivedStateFromProps(props: TProps, state: TState) {
        if (props.activeTab !== state.activeTab) {
            return ({
                ...state,
                activeTab: props.activeTab,
                activeIndex: 0,
            })
        }
        return state;
    }

    renderData = (): TMovie[] | TTvShows[] => {
        const { activeTab } = this.state
        const { moviesList, tvShowsList } = this.props
        if (this.props.loading) {
            return Array.from({ length: 5 }, (_, index) => ({
                _id: `${index}`,
            }))
        }
        return activeTab === "movies" ? moviesList : tvShowsList
    }

    updateActiveIndex = (newIndex: number): void => {
        if (newIndex !== -1 && newIndex !== this.renderData().length) {
            this.setState(() => ({
                activeIndex: newIndex
            }))
        }
    }

    onTouchStart = (event: React.TouchEvent<HTMLDivElement>): void => {
        this.setState(() => ({
            mobileCarouselStartTouchPosition: event.targetTouches[0].clientX
        }))
    }

    onTouchMove = (event: React.TouchEvent<HTMLDivElement>): void => {
        if (this.props.loading) {
            return
        }
        return this.setState(() => ({
            mobileCarouselMoveTouchPosition: event.targetTouches[0].clientX
        }))

    }
    onTouchEnd = (): void => {
        if (this.props.loading) {
            return
        }
        if (this.state.mobileCarouselMoveTouchPosition - this.state.mobileCarouselStartTouchPosition > 50) {
            return this.updateActiveIndex(this.state.activeIndex - 1)
        }
        if (this.state.mobileCarouselMoveTouchPosition - this.state.mobileCarouselStartTouchPosition < -50) {

            return this.updateActiveIndex(this.state.activeIndex + 1)
        }
    }

    render() {
        const { activeIndex } = this.state
        const { loading } = this.props
        return (
            <CarouselContainer
                onTouchStart={event => this.onTouchStart(event)}
                onTouchMove={event => this.onTouchMove(event)}
                onTouchEnd={this.onTouchEnd}
                className="">
                {
                    !loading && activeIndex > 0 && <SwitchArrow
                        direction="left"
                        onClick={() => this.updateActiveIndex(activeIndex - 1)}
                    >
                        <Image
                            src="/left-arrow.svg"
                            width="18px"
                            height="32px"
                            alt="left-arrow"
                        />
                    </SwitchArrow>
                }
                <CarouselItemsContainer
                    translate={this.state.activeIndex}
                >
                    {
                        this.renderData().map((el, index) => (
                            <CarouselItem
                                key={el._id}
                            >
                                <SquareLoading
                                    loading={loading}
                                    width={300}
                                    height={360}
                                    id={el._id || `${index}`}
                                >
                                    <Image
                                        src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${el.poster_path}`}
                                        width="300px"
                                        height="360px"
                                        alt=""
                                        layout="fixed"
                                        objectFit="cover"
                                        className={styles.image}
                                    />
                                    <CarouselItemTitle>
                                        {el.title || el.name}
                                    </CarouselItemTitle>
                                </SquareLoading>
                            </CarouselItem>
                        ))
                    }
                </CarouselItemsContainer>

                {!loading && this.state.activeIndex < this.renderData().length - 3 && <SwitchArrow
                    direction="right"
                    onClick={() => this.updateActiveIndex(this.state.activeIndex + 1)}
                >
                    <Image
                        src="/right-arrow.svg"
                        width="18px"
                        height="32px"
                        alt="left-arrow"
                    />
                </SwitchArrow>}

                {!loading && <MobileStepsContainer>
                    {
                        this.renderData().map((_, index) => (
                            <MobileStep key={index} isActive={index === this.state.activeIndex} />
                        ))
                    }
                </MobileStepsContainer>}

            </CarouselContainer>
        )
    }
}

export default Carousel