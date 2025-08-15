// src/navigation/NavigationService.ts
import {
  CommonActions,
  StackActions,
  DrawerActions,
  createNavigationContainerRef,
  type NavigationState,
  type PartialState,
} from '@react-navigation/native';
import { DrawerParamList, RootStackParamList } from 'navigation/types';

/**
 * Bật/tắt log điều hướng để debug.
 */
const DEBUG_NAV = true;
const log = (...a: any[]) => DEBUG_NAV && console.log('[NAV]', ...a);

/**
 * Ref chính cho NavigationContainer.
 */
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

/**
 * Hàng đợi action khi NavigationContainer chưa sẵn sàng.
 */
const queue: Array<() => void> = [];

function run(job: () => void, label?: string) {
  if (navigationRef.isReady()) {
    log('RUN', label);
    try {
      job();
    } catch (e) {
      log('ERROR', label, e);
    }
  } else {
    log('QUEUE', label);
    queue.push(job);
  }
}

/**
 * Gọi trong <NavigationContainer onReady={onReady}>
 * để xả hàng đợi sau khi container sẵn sàng.
 */
export function onReady() {
  log('READY, flush', queue.length);
  while (queue.length) {
    try {
      queue.shift()?.();
    } catch (e) {
      log('ERROR while flushing queue', e);
    }
  }
}

/**
 * (Tuỳ chọn) Gắn vào onStateChange để log màn hiện tại / analytics.
 */
export function onStateChange(_state?: NavigationState) {
  const r = navigationRef.getCurrentRoute();
  log('STATE ->', r?.name, r?.params);
}

/** Type tên route từ RootStackParamList */
export type RouteName = keyof RootStackParamList & DrawerParamList;

/**
 * Kiểm tra route có tồn tại trong cây navigator hiện tại không.
 * Hữu ích để phát hiện "Action 'NAVIGATE' was not handled".
 */
function containsRoute(
  state: NavigationState | PartialState<NavigationState> | undefined,
  target: string
): boolean {
  if (!state) return false;
  if (state.routeNames?.includes?.(target)) return true;
  // Duyệt sâu vào các nested state
  return state.routes?.some?.((r: any) => containsRoute(r.state, target)) ?? false;
}

/** Lấy route hiện tại */
export function getCurrentRoute() {
  return navigationRef.getCurrentRoute(); // { key, name, params }
}

/** Có thể back được không */
export function canGoBack() {
  try {
    return navigationRef.canGoBack();
  } catch {
    return false;
  }
}

/** Điều hướng cơ bản (an toàn/typed) */
export function navigate<Name extends RouteName>(
  name: Name,
  params?: RootStackParamList[Name]
) {
  run(() => {
    const n = String(name);
    const root = navigationRef.getRootState();
    if (root && !containsRoute(root, n)) {
      log('⚠️ NAVIGATE target not in tree:', n, 'params:', params);
    }
    log('navigate ->', n, params, 'isReady=', navigationRef.isReady());
    navigationRef.navigate(name as never, params as never);
  }, `navigate:${String(name)}`);
}

/**
 * push: chỉ có tác dụng trên Stack hiện tại.
 * Nếu không phải Stack (ví dụ đang ở Drawer/Tab), sẽ fallback sang navigate.
 */
export function push<Name extends RouteName>(
  name: Name,
  params?: RootStackParamList[Name]
) {
  run(() => {
    const n = String(name);
    const root = navigationRef.getRootState();
    if (root && !containsRoute(root, n)) {
      log('⚠️ PUSH target not in tree:', n, 'params:', params);
    }
    log('push ->', n, params);
    try {
      navigationRef.dispatch(StackActions.push(n, params as object));
    } catch (e) {
      log('push fallback to navigate due to error:', e);
      navigationRef.navigate(name as never, params as never);
    }
  }, `push:${String(name)}`);
}

/** replace màn hiện tại (Stack) */
export function replace<Name extends RouteName>(
  name: Name,
  params?: RootStackParamList[Name]
) {
  run(() => {
    const n = String(name);
    log('replace ->', n, params);
    try {
      navigationRef.dispatch(StackActions.replace(n, params as object));
    } catch (e) {
      log('replace fallback to reset due to error:', e);
      resetTo(name, params);
    }
  }, `replace:${String(name)}`);
}

/** reset về một route duy nhất (xóa history) */
export function resetTo<Name extends RouteName>(
  name: Name,
  params?: RootStackParamList[Name]
) {
  run(() => {
    const n = String(name);
    log('resetTo ->', n, params);
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: n, params }],
      })
    );
  }, `resetTo:${String(name)}`);
}

/** goBack an toàn */
export function goBack() {
  run(() => {
    if (navigationRef.canGoBack()) {
      log('goBack');
      navigationRef.goBack();
    } else {
      log('goBack ignored (no back stack)');
    }
  }, 'goBack');
}

/** set params cho route hiện tại */
export function setParams(params?: Record<string, unknown>) {
  run(() => {
    log('setParams ->', params);
    navigationRef.dispatch(CommonActions.setParams(params));
  }, 'setParams');
}

/** Drawer helpers */
export function openDrawer() {
  run(() => navigationRef.dispatch(DrawerActions.openDrawer()), 'openDrawer');
}
export function closeDrawer() {
  run(() => navigationRef.dispatch(DrawerActions.closeDrawer()), 'closeDrawer');
}
export function toggleDrawer() {
  run(() => navigationRef.dispatch(DrawerActions.toggleDrawer()), 'toggleDrawer');
}

/**
 * Điều hướng đến nested screen (dùng cho Drawer/Tab/Stack lồng nhau).
 * Ví dụ:
 * navigateNested('AppDrawer', { screen: 'Settings' })
 * navigateNested('AppDrawer', { screen: 'HomeStack', params: { screen: 'Detail', params: { id: 1 }} })
 */
export function navigateNested(
  parentName: RouteName,
  nested: any // để linh hoạt cho cấu trúc { screen, params } lồng nhau
) {
  run(() => {
    log('navigateNested ->', String(parentName), nested);
    navigationRef.navigate(parentName as never, nested as never);
  }, `navigateNested:${String(parentName)}`);
}

/** (Tuỳ chọn) Điều hướng từ path nếu tự parse deeplink */
export function navigateFromPath(path: string) {
  // Bạn có thể tự parse path -> state bằng getStateFromPath nếu đã config linking.
  // Để tối giản, mình để chỗ này tuỳ biến thêm khi bạn có cấu hình linking.
  log('navigateFromPath (placeholder) ->', path);
}

/** Export service object cho tiện import */
const NavigationService = {
  navigationRef,
  onReady,
  onStateChange,

  navigate,
  push,
  replace,
  resetTo,
  goBack,
  canGoBack,
  setParams,

  openDrawer,
  closeDrawer,
  toggleDrawer,

  navigateNested,
  navigateFromPath,

  getCurrentRoute,
};

export default NavigationService;
