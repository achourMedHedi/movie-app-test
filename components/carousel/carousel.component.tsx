import React from "react";
import { TProps, TState } from "./carousel.types";
import Image from 'next/image'
import { CarouselContainer, CarouselItem, SwitchArrow, CarouselItemsContainer, styles, CarouselItemTitle, MobileStepsContainer, MobileStep } from "./carousel.styles";


class Carousel extends React.Component<TProps, TState, any> {

    constructor(props: TProps) {
        super(props)
        this.state = {
            activeIndex: 0,
            movies: Array.from({ length: 10 }, () => { }),
        }

    }

    updateActiveIndex = (newIndex: number) => {
        if (newIndex === this.state.movies.length - 3) {
            this.setState(() => ({
                movies: [...this.state.movies, ...Array.from({ length: 10 }, () => { })]
            }))
        }
        if (newIndex === -2) {
            return this.setState(() => ({
                activeIndex: this.state.movies.length - 4

            }))
        }
        return this.setState(() => ({
            activeIndex: newIndex
        }))
    }




    render() {
        return (
            <CarouselContainer className="">
                {<SwitchArrow
                    direction="left"
                    onClick={() => this.updateActiveIndex(this.state.activeIndex - 1)}
                >
                    <Image
                        src="/left-arrow.svg"
                        width="18px"
                        height="32px"
                        alt="left-arrow"
                    />
                </SwitchArrow>}
                <CarouselItemsContainer  translate={this.state.activeIndex} >
                    {
                        this.state.movies.map((el, index) => (
                            <CarouselItem key={index} >
                                <Image
                                    src="/movie-example.jpg"
                                    width="300px"
                                    height="360px"
                                    alt=""
                                    layout="fixed"
                                    objectFit="cover"
                                    className={styles.image}
                                />
                                <CarouselItemTitle>
                                    Me Before You {index}
                                </CarouselItemTitle>
                            </CarouselItem>
                        ))
                    }
                </CarouselItemsContainer>

                <SwitchArrow
                    direction="right"
                    onClick={() => this.updateActiveIndex(this.state.activeIndex + 1)}
                >
                    <Image
                        src="/right-arrow.svg"
                        width="18px"
                        height="32px"
                        alt="left-arrow"
                    />
                </SwitchArrow>

                <MobileStepsContainer>
                    {
                        this.state.movies.map((_, index) => (
                            <MobileStep key={index} isActive={index === 1} />
                        ))
                    }
                </MobileStepsContainer>

            </CarouselContainer>
        )
    }
}

export default Carousel