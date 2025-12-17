/**
 * React Performance Optimization Utilities
 *
 * Utilities for optimizing React component performance including:
 * - Memoization helpers
 * - Component optimization patterns
 * - Re-render prevention
 */

import React, { useMemo, useCallback, memo, type ComponentType } from "react";

/**
 * Memoize component with React.memo
 * Useful for preventing unnecessary re-renders
 */
export function memoizeComponent<P extends object>(
  Component: ComponentType<P>,
  areEqual?: (prevProps: P, nextProps: P) => boolean
): ComponentType<P> {
  return memo(Component, areEqual);
}

/**
 * Custom hook for memoized callback that never changes
 * Useful for event handlers that don't depend on props/state
 */
export function useStableCallback<T extends (...args: unknown[]) => unknown>(callback: T): T {
  return useCallback(callback, []) as T;
}

/**
 * Custom hook for memoized value that only recalculates when dependencies change
 * Wrapper around useMemo with better TypeScript inference
 */
export function useStableValue<T>(factory: () => T, deps: React.DependencyList): T {
  return useMemo(factory, deps);
}

/**
 * Higher-order component for lazy loading
 * Wraps component with React.lazy and Suspense
 */
/**
 * Create lazy-loaded component with Suspense wrapper
 * Note: For Next.js, prefer dynamic imports from 'next/dynamic'
 */
export function createLazyComponent<P extends object>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  fallback?: React.ReactNode
): ComponentType<P> {
  const LazyComponent = React.lazy(importFn);

  return function LazyWrapper(props: P) {
    return React.createElement(
      React.Suspense,
      { fallback: fallback || React.createElement("div", null, "Loading...") },
      React.createElement(LazyComponent, props)
    );
  };
}

/**
 * Prevent re-renders when props haven't changed
 * Shallow comparison of props
 */
export function shallowEqual<T>(objA: T, objB: T): boolean {
  if (Object.is(objA, objB)) {
    return true;
  }

  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];
    const objARecord = objA as Record<string, unknown>;
    const objBRecord = objB as Record<string, unknown>;
    if (
      !Object.prototype.hasOwnProperty.call(objB, key) ||
      !Object.is(objARecord[key], objBRecord[key])
    ) {
      return false;
    }
  }

  return true;
}

/**
 * Memoize component with shallow prop comparison
 */
export function memoizeWithShallow<P extends object>(
  Component: ComponentType<P>
): ComponentType<P> {
  return memo(Component, shallowEqual);
}
