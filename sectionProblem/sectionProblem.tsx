import classnames from 'classnames';
import { FlexBox } from '@thewhite/react-flex-layout';
import { WsReactBaseComponent } from '@thewhite/react-base-components';
import * as React from 'react';

export default class SectionProblem extends WsReactBaseComponent<{}, {}> {
    render(): false | JSX.Element {
        return (
            <div
                className={'section-problem'}
            >
                <div
                    className={'section-problem__wrap'}
                >
                    <FlexBox
                        className={'section-problem__inner'}
                        row={'sa sb'}
                    >
                        <FlexBox
                            column={'start start'}
                            className={'section-problem__header'}
                        >
                            <h1
                                className={classnames(
                                    'page-title-2',
                                    'section-problem__header-title',
                                )}
                            >
                                wsDOCS
                            </h1>
                            <h3
                                className={classnames(
                                    'section-problem__header-text',
                                    'subheader-1',
                                )}
                            >
                                Умный документооборот для организаций любого масштаба
                            </h3>
                        </FlexBox>
                        <img
                            src={'assets/images/section-problem-main-img.png'}
                            alt={'Software Development'}
                            className={'section-problem__logo'}
                        />
                    </FlexBox>
                    <img
                        alt={'Software Development'}
                        className={'section-problem__content-image'}
                        src={'assets/images/section-problem-back-img.png'}
                    />
                </div>
            </div>
        );
    }
}
