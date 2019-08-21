/**
 *
 * TomoWallet - Loadable Containers
 *
 * This file contains a set of containers which is configured with loadable-components,
 * in order to splitting chunk files in production.
 */
// ===== IMPORTS =====
// Modules
import loadable from 'loadable-components';
// ===================

// ===== LOADABLE CONTAINERS =====
export const WelcomePage = loadable(() => import('../../Welcome'));
export const CreateWalletPage = loadable(() => import('../../WalletCreation'));
export const ImportWallet = loadable(() => import('../../ImportWallet'));
export const MyWallet = loadable(() => import('../../MyWallet'));
// ===============================
