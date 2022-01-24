import classnames from 'classnames';
import { FlexBox } from '@thewhite/react-flex-layout';
import { WsReactBaseComponent, WsReactBaseComponentInterface } from '@thewhite/react-base-components';
import * as React from 'react';

export interface Slide {
    slideText: string;
    img: string;
}

interface SectionSliderState {
    slideList: Slide[];
    leftPosition: number;
    activeSlide: number;
}

interface SectionSliderParams extends WsReactBaseComponentInterface {
    [value: string]: any;

    state: SectionSliderState;

    sliderRef: HTMLDivElement | null;
}

export default class SectionSlider extends WsReactBaseComponent<{}, SectionSliderState> implements SectionSliderParams {
    [value: string]: any;

    sliderRef: HTMLDivElement | null = null;

    state: SectionSliderState = {
        slideList: [
            {
                slideText: 'Простота добавления и редактирования логики отчетов, для этого не нужно знать весь стек технологий проекта, достаточно понимать структуру данных нужной вам предметной области.',
                img: 'add-files',
            },
            {
                slideText: 'Данные из различных приложений можно выгрузить в табличные представления Excel / Word / PDF файлы для последующей обработки.',
                img: 'documents',
            },
            {
                slideText: 'В стандартную комплектацию системы уже включено более 50 отчетных форм, для большинства стандартных задач.',
                img: 'memory-storage',
            },
            {
                slideText: 'Есть опыт совмещения данных в отчетах на время перехода с одного СЭД на другой, позволяет упростить переход на WS СЭД с любого другого решения.',
                img: 'business-analytics',
            },
            {
                slideText: 'В сложной организации, родительские подразделения могут контролировать работу дочерних, при помощи отчетности, учитывающей работу всей структуры.',
                img: 'file-searching',
            },
        ],
        leftPosition: 0,
        activeSlide: 0,
    };

    /**
     * Листаю слайд вперед
     */
    slideRight = () => {
        if (this.getIndexActiveSlide() === this.state.slideList.length - 1) {
            this.setState({ leftPosition: 0 });
        } else {
            this.setState({ leftPosition: this.state.leftPosition - (this.sliderRef?.clientWidth ?? 0) });
        }
    }

    /**
     * Листаю слайд назад
     */
    slideLeft = () => {
        if (this.getIndexActiveSlide() === 0) {
            this.setState({
                leftPosition: -((this.state.slideList.length - 1) * (this.sliderRef?.clientWidth ?? 0)),
            });
        } else {
            this.setState({ leftPosition: this.state.leftPosition + (this.sliderRef?.clientWidth ?? 0) });
        }
    }

    /**
     * Листаю на нужный слайд
     */
    clickDot = (index: number) => {
        this.setState({ leftPosition:  -(this.sliderRef?.clientWidth ?? 0) * index });
    }

    /**
     * Получить индекс активного слайда для отображения
     */
    getIndexActiveSlide = (): number => {
        let index: number = Math.abs(this.state.leftPosition / (this.sliderRef?.clientWidth ?? 0));

        return index ? index : 0;
    }

    render(): false | JSX.Element {
        return (
            <div
                className={'section-slider'}
            >
                <img
                    className={'section-slider__background-image'}
                    src={'assets/images/et_document.png'}
                />
                <div
                    className={'section-slider__wrap'}
                >
                    <FlexBox
                        row={'end center'}
                        className={classnames(
                            'page-title-2',
                            'section-slider__content-title',
                        )}
                    >
                        Аналитика и отчетность
                    </FlexBox>
                    <FlexBox
                        row={'start center'}
                        className={'section-slider__slider'}
                    >
                        <div
                            onClick={() => this.slideLeft()}
                            className={'section-slider__button'}
                        >
                            <img
                                src={'assets/images/section-slider-prev.png'}
                            />
                        </div>
                        <div
                            ref={node => this.sliderRef = node}
                            className={'section-slider__slider-wrap'}
                        >
                            <div
                                className={'section-slider__slider-items'}
                                style={{
                                    left: this.state.leftPosition,
                                }}
                            >
                                {
                                    this.state.slideList.map((slide: Slide, index: number) => {
                                        return (
                                            <div
                                                key={index}
                                                className={classnames(
                                                    'section-slider__slider-item',
                                                    {
                                                        'section-slider__slider-item--active': this.getIndexActiveSlide() === index,
                                                    },
                                                )}
                                            >
                                                <FlexBox
                                                    row={'ctr'}
                                                    className={'section-slider__slider-item-wrap'}
                                                >
                                                    <div
                                                        className={classnames(
                                                            'subheader-2',
                                                            'section-slider__slider-item-text',
                                                        )}
                                                    >
                                                        { slide.slideText }
                                                    </div>
                                                    <img
                                                        className={'section-slider__slider-item-image'}
                                                        src={`assets/images/section-slider-${slide.img}.png`}
                                                    />
                                                </FlexBox>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        <div
                            onClick={() => this.slideRight()}
                            className={'section-slider__button'}
                        >
                            <img
                                src={'assets/images/section-slider-next.png'}
                            />
                        </div>
                    </FlexBox>
                    <FlexBox
                        row={'ctr'}
                    >
                        {
                            this.state.slideList.map((slide: Slide, index: number) => {
                                return (
                                    <div
                                        key={index}
                                        className={classnames(
                                            'section-slider__dots',
                                            {
                                                'section-slider__dots--active': this.getIndexActiveSlide() === index,
                                            },
                                        )}
                                        onClick={() => this.clickDot(index)}
                                    />
                                );
                            })
                        }
                    </FlexBox>
                </div>
            </div>
        );
    }
}
