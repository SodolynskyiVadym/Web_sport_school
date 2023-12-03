import { createRouter, createWebHistory } from 'vue-router';
import axios from "axios";

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
        path: '/registerOld',
        name: 'RegisterPageOld',
        component: () => import('@/components/RegisterOldVersion.vue')
    },
    {
        path: '/loginOld',
        name: 'LoginPageOld',
        component: () => import('@/components/LoginOldVersion.vue'),
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
        path: '/review',
        name: 'ReviewPage',
        component: () => import('./src/components/ReviewPage.vue')
    },
    {
        path: '/tester',
        name: 'ReviewPage',
        component: () => import('./src/components/TesterPage.vue')
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
        path: '/register',
        name: 'Registration',
        component: () => import('@/components/LoginRegistration.vue')
    },
    {
        path: '/updateGroup/:groupID',
        name: 'UpdateGroup',
        component: () => import('./src/components/UpdateGroup.vue')
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
            const res = await axios.post("http://localhost:8000/users/getRoleUser", {token: token});
            const role = res.data.role;

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