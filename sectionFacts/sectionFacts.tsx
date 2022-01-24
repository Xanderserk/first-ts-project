import classnames from 'classnames';
import { FlexBox } from '@thewhite/react-flex-layout';
import { WsReactBaseComponent, WsReactBaseComponentInterface } from '@thewhite/react-base-components';
import * as React from 'react';
import CountUp from 'react-countup';
import CheckView from '../../../Global/components/checkView/checkViewComponent';

export interface Fact {
    quantity: number;
    title: string;
    img: string;
    tooltip: string;
    active: boolean;
}

interface SectionFactsState {
    factsList: Fact[];
    mouseIndent: number;
    tooltip: string | null;
    topIndentTooltip: number;
    leftIndentTooltip: number;
    counterAnimationDefault: number;
    counterAnimationStart: boolean;
}

interface SectionFactsParams extends WsReactBaseComponentInterface {
    [value: string]: any;

    state: SectionFactsState;
    sectionFactsRef: HTMLDivElement | null;
}

export default class SectionFacts extends WsReactBaseComponent<{}, SectionFactsState> implements SectionFactsParams {
    [value: string]: any;
    sectionFactsRef: HTMLDivElement | null = null;

    state: SectionFactsState = {
        factsList: [
            {
                quantity: 1000,
                title: 'Организаций',
                img: 'organization',
                tooltip: 'У нашей компании есть опыт внедрения СЭД, где в одной системе заведено более 1000 организаций и мест регистрации документов',
                active: false,
            },
            {
                quantity: 35000,
                title: 'Документов создаётся за день',
                img: 'docs',
                tooltip: 'Типичная нагрузка для нашей системы внедренной в Правительстве Хабаровского Края это от 25 до 70 тысяч документов в день',
                active: false,
            },
            {
                quantity: 5000,
                title: 'Пользователей одновременно',
                img: 'laptop',
                tooltip: 'Благодаря микросервисной архитектуре, систему можно масштабировать для поддержки большего количества одновременных запросов от пользователей',
                active: false,
            },
            {
                quantity: 21000,
                title: 'Сотрудников',
                img: 'employee',
                tooltip: 'У нашей компании есть опыт внедрения СЭД, в структуру с более чем 21000 активных сотрудников. При этом вся организационно штатная структура была перенесена из прошлой версии документооборота',
                active: false,
            },
        ],
        tooltip: null,
        topIndentTooltip: 0,
        leftIndentTooltip: 0,
        counterAnimationDefault: 0,
        counterAnimationStart: false,
        mouseIndent: 30,
    };

    componentDidMount() {
        this.listenerMouse();
        this.showFactHoverText();
        this.hideFactHoverText();
    }

    /**
     * Показать tooltip с текстом
     */
    showFactHoverText() {
        this.state.factsList.forEach((fact: Fact, index: number) => {
            this[`factContentRef${index}`].addEventListener(
                'mouseover',
                (event: MouseEvent) => {
                    const factsList: Fact[] = this.state.factsList;
                    factsList[index].active = true;
                    this.setState({ factsList });
                },
            );
        });
    }

    /**
     * Слушатель мышки
     */
    listenerMouse = () => {
        document.addEventListener(
            'mousemove',
            (event: MouseEvent) => {
                this.setState({
                    topIndentTooltip: event.clientY + this.state.mouseIndent,
                    leftIndentTooltip: event.clientX + this.state.mouseIndent,
                });
            },
        );
    }

    /**
     * Скрыть tooltip с текстом
     */
    hideFactHoverText() {
        this.state.factsList.forEach((fact: Fact, index: number) => {
            this[`factContentRef${index}`].addEventListener(
                'mouseout',
                () => {
                    const factsList: Fact[] = this.state.factsList;
                    factsList[index].active = false;
                    this.setState({ factsList });
                },
            );
        });
    }

    /**
     * Анимация счётчика
     */
    counterAnimation() {
        this.setState({ counterAnimationStart: true });
    }

    render(): false | JSX.Element {
        return (
            <div
                className={'section-facts'}
                ref={node => this.sectionFactsRef = node}
            >
                <FlexBox
                    row={'end center'}
                    className={classnames(
                        'page-title-2',
                        'section-facts__content-title',
                    )}
                >
                    Факты
                </FlexBox>
                <CheckView
                    onViewCallback={() => this.counterAnimation()}
                >
                    <FlexBox
                        rowWrap={'start'}
                    >
                        {
                            this.state.factsList.map((fact: Fact, index: number) => {
                                return (
                                    <div
                                        key={index}
                                        ref={node => this[`factContentRef${index}`] = node}
                                        className={'section-facts__content-item'}
                                    >
                                        <div>
                                            <div
                                                className={classnames(
                                                    'page-title-1',
                                                    'section-facts__content-item-quantity',
                                                )}
                                            >
                                                +
                                                {
                                                    this.state.counterAnimationStart
                                                        ? <CountUp
                                                            start={this.state.counterAnimationDefault}
                                                            end={fact.quantity}
                                                            duration={1.5}
                                                        />
                                                        : this.state.counterAnimationDefault
                                                }
                                            </div>
                                            <span
                                                className={classnames(
                                                    'subheader-1',
                                                    'section-facts__content-item-title',
                                                )}
                                            >
                                                {fact.title}
                                            </span>
                                        </div>
                                        <img
                                            className="section-facts__content-item-image"
                                            src={`assets/images/section-facts-${fact.img}.png`}
                                            alt={'Software Development'}
                                        />
                                        {
                                            fact.active &&
                                            <div
                                                className={classnames(
                                                    'caption-1',
                                                    'section-facts__content-tooltip-wrapper',
                                                )}
                                                style={{
                                                    top: this.state.topIndentTooltip,
                                                    left: this.state.leftIndentTooltip,
                                                }}
                                            >
                                                {fact.tooltip}
                                            </div>
                                        }
                                    </div>
                                );
                            })
                        }
                    </FlexBox>
                </CheckView>
            </div>
        );
    }
}
