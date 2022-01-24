import classnames from 'classnames';
import { FlexBox } from '@thewhite/react-flex-layout';
import { WsReactBaseComponent, WsReactBaseComponentInterface } from '@thewhite/react-base-components';
import * as React from 'react';
import CheckView from '../../../Global/components/checkView/checkViewComponent';

export interface TimeSaving {
    icon: string;
    title: string;
    points: string;
    personCount: number;
    period: string;
    humanColorAmount: number;
}

interface SectionTechnologiesState {
    timeSavingList: TimeSaving[];
    humanAllAmount: number;
    delay: number;
}

interface SectionTimeSavingParams extends WsReactBaseComponentInterface {
    sectionTimeSavingContentRef: React.RefObject<HTMLDivElement>;
    state: SectionTechnologiesState;
}

export default class SectionTimeSaving extends WsReactBaseComponent<{}, SectionTechnologiesState> implements SectionTimeSavingParams{
    sectionTimeSavingContentRef: React.RefObject<HTMLDivElement> = React.createRef();
    state: SectionTechnologiesState = {
        timeSavingList: [
            {
                icon: 'document',
                title: 'Шаблоны рассылки документов',
                points: '500',
                personCount: 3,
                period: 'мес',
                humanColorAmount: 10,
            },
            {
                icon: 'emblem-rf',
                title: 'Автоматическая выгрузка результатов в ССТУ с умным поиском ошибок исполнителей',
                points: '8-10',
                personCount: 6,
                period: 'неделю',
                humanColorAmount: 10,
            },
            {
                icon: 'sheets',
                title: 'Шаблоны сопроводительных писем',
                points: '1200',
                personCount: 1,
                period: 'мес',
                humanColorAmount: 10,
            },
            {
                icon: 'gosuslugi',
                title: 'Интеграция с краевыми порталами и «Госуслугами»',
                points: '2-3',
                personCount: 8,
                period: 'день',
                humanColorAmount: 10,
            },
        ],
        humanAllAmount: 10,
        delay: 150,
    };

    /**
     * Анимация затраты человеко-часов
     * @param index
     */
    humanAnimations(index: number): void {
        const timerId = setInterval(
            () => this.humanAnimationsStateUpdate(index),
            this.state.delay,
        );

        setTimeout(
            () => clearInterval(timerId),
            this.state.delay * this.state.timeSavingList[index].humanColorAmount,
        );
    }

    /**
     * Анимация затраты человеко-часов (обновляем State)
     * @param index
     */
    humanAnimationsStateUpdate (index: number): void {
        const timeSavingList = this.state.timeSavingList;
        timeSavingList[index].humanColorAmount = this.state.timeSavingList[index].humanColorAmount - 1;
        this.setState({ timeSavingList });
    }

    /**
     * Проверка условий для анимации
     * @param el
     * @param index
     */
    checkIndexForCondition (el: TimeSaving, index: number): boolean {
        return index > el.humanColorAmount && index > el.personCount;
    }

    render(): false | JSX.Element {
        return (
            <div
                className={'section-time-saving'}
            >
                <FlexBox
                    row={'start end'}
                    className={'section-time-saving__container'}
                >
                    <FlexBox
                        row={'start center'}
                        className={classnames(
                            'section-time-saving__container-title',
                            'page-title-2',
                        )}
                    >
                        Экономия времени
                    </FlexBox>
                    <img
                        src={'/assets/images/section-time-saving-background-image.png'}
                        alt={'Time'}
                        className={'section-time-saving__container-image'}
                    />
                </FlexBox>
                <div
                    ref={this.sectionTimeSavingContentRef}
                >
                    <div>
                        {
                            this.state.timeSavingList.map((timeSaving: TimeSaving, key: number) => {
                                return (
                                    <React.Fragment
                                        key={key}
                                    >
                                        <CheckView
                                            onViewCallback={() => this.humanAnimations(key)}
                                        >
                                            <FlexBox
                                                row={'start center'}
                                                className={'section-time-saving__content'}
                                            >
                                                <FlexBox
                                                    row={'start center'}
                                                    className={'section-time-saving__content-left'}
                                                >
                                                    <img
                                                        src={`/assets/images/section-time-saving__content-${timeSaving.icon}.png`}
                                                        alt={'Documents'}
                                                        className={'section-time-saving__content-image'}
                                                    />
                                                    <div
                                                        className={classnames(
                                                            'section-time-saving__content-description',
                                                            'subheader-1',
                                                        )}
                                                    >
                                                        {timeSaving.title}
                                                    </div>
                                                </FlexBox>
                                                <FlexBox
                                                    row={'space-between center'}
                                                    className={'section-time-saving__content-right'}
                                                >
                                                    <div
                                                        className={'section-time-saving__content-wrap'}
                                                    >
                                                        <div
                                                            className={classnames(
                                                                'section-time-saving__content-text',
                                                                'body-2',
                                                            )}
                                                        >
                                                            экономит
                                                        </div>
                                                        <div
                                                            className={classnames(
                                                                'section-time-saving__content-value',
                                                                'subheader-2',
                                                            )}
                                                        >
                                                            {timeSaving.points}
                                                        </div>
                                                        <div
                                                            className={classnames(
                                                                'section-time-saving__content-text',
                                                                'body-2',
                                                            )}
                                                        >
                                                            человеко-часов / {timeSaving.period}
                                                        </div>
                                                    </div>
                                                    <FlexBox
                                                        row={'start'}
                                                    >
                                                        {
                                                            new Array(this.state.humanAllAmount)
                                                                .fill(this.state.humanAllAmount)
                                                                .map((el: any, index: number) => {
                                                                    return (
                                                                        <FlexBox
                                                                            key={index}
                                                                            className={classnames(
                                                                                'section-time-saving__content-human-image',
                                                                                {
                                                                                    'section-time-saving__content-human-image--not-painted': this.checkIndexForCondition(timeSaving, index),
                                                                                },
                                                                            )}
                                                                        />
                                                                    );
                                                                })
                                                        }
                                                    </FlexBox>
                                                </FlexBox>
                                            </FlexBox>
                                        </CheckView>
                                    </React.Fragment>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}
