import HomePage from '../pages/HomePage/HomePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import OrderPage from '../pages/OrderPage/OrderPage';
import ProductDetailPage from '../pages/ProductDetailPage/ProductDetailPage';
import ProfilePage from '../pages/Profile/ProfilePage';
import SignInPage from '../pages/SignInPage/SignInPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import TypeProductPage from '../pages/TypeProductPage/TypeProductPage';

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true,
    },
    {
        path: '/products-detail',
        page: ProductDetailPage,
        isShowHeader: true,
    },
    {
        path: '/products',
        page: TypeProductPage,
        isShowHeader: true,
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false,
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false,
    },
    {
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true,
    },
    {
        path: '*',
        page: NotFoundPage,
    },
];
