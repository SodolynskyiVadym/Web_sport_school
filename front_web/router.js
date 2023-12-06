import { createRouter, createWebHistory } from 'vue-router';
import * as listURL from "@/js/listURL";

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: () => import('./src/components/HomePage.vue')
    },
    {
        path: '/schedule',
        name: 'SchedulePage',
        component: () => import('./src/components/SchedulePage.vue')
    },
    {
        path: '/coaches',
        name: 'CoachPage',
        component: () => import('./src/components/CoachPage.vue')
    },
    {
        path: '/groups',
        name: 'GroupPage',
        component: () => import('./src/components/GroupPage.vue')
    },
    {
        path: '/tester',
        name: 'TesterPage',
        component: () => import('./src/components/TesterPage.vue')
    },
    {
        path: '/testing',
        name: 'ReviewPage',
        component: () => import('./src/components/TestingPage.vue')
    },
    {
        path: '/overviewGroup/:id',
        name: 'OverviewGroup',
        component: () => import('@/components/OverviewGroup.vue')
    },
    {
        path: '/overviewCoach/:id',
        name: 'OverviewCoach',
        component: () => import('./src/components/OverviewCoach.vue')
    },
    {
        path: '/admin',
        name: 'AdminPage',
        component: () => import('./src/components/AdminPage.vue'),
        meta: {
            requiresAuth: true,
            roles: ["admin"]
        }
    },
    {
        path: '/createGroup',
        name: 'CreateGroup',
        component: () => import('./src/components/CreateGroup.vue'),
        meta: {
            requiresAuth: true,
            roles: ["coach"]
        }
    },
    {
        path: '/createSchedule',
        name: 'createSchedule',
        component: () => import('./src/components/CreateSchedule.vue'),
        meta: {
            requiresAuth: true,
            roles: ["coach"]
        }
    },
    {
        path: '/settingsAccount',
        name: 'settingsAccount',
        component: () => import('./src/components/SettingsAccount.vue'),
        meta: {
            requiresAuth: true,
            roles: ["coach", "admin", "user"]
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/components/LoginRegistration.vue')
    },
    {
        path: '/forgotPassword',
        name: 'ForgotPasswordPage',
        component: () => import('@/components/ForgotPasswordPage.vue')
    },
    {
        path: '/updateGroup/:groupID',
        name: 'UpdateGroup',
        component: () => import('./src/components/UpdateGroup.vue')
    },
    {
        path: '/join/:groupID/:userID',
        name: 'JoinGroup',
        component: () => import('./src/components/JoinScript.vue')
    }
];



const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresAuth) {
        const token = localStorage.getItem('token');
        if (token) {
            const userData = await listURL.getUserByToken(localStorage.getItem("token"));
            const role = userData.role;

            if (to.meta.roles.includes(role)) {
                next();
            } else {
                next("/login");
            }
        } else {
            next('/login');
        }
    }else {
        next();
    }
});

export default router;