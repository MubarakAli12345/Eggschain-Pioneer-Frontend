import React from 'react';
import {Redirect} from 'react-router-dom';

export const MeetingAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/scrumboard/boards/:boardId/:boardUri?',
            component: React.lazy(() => import('./board/Board'))
        },
        {
            path     : '/apps/scrumboard/boards',
            component: React.lazy(() => import('./boards/Boards'))
        },
        {
            path     : '/apps/scrumboard',
            component: () => <Redirect to="/apps/scrumboard/boards"/>
        }
    ]
};
