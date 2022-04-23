import { DOMElement, useFocusManager } from 'ink';
import { useCallback, useEffect, useRef, useState } from 'react';

const ITEM_HEIGHT = 3;

export const useItemScroll = (itemCount: number) => {
  const containerRef = useRef<DOMElement>(null);
  const itemsRef = useRef<DOMElement[]>([]);
  const [focusItem, setFocusItem] = useState(0);
  const [viewPort, setViewport] = useState([0, itemCount]);
  const focusManager = useFocusManager();

  const getContainerHeight = useCallback(
    () => containerRef.current?.yogaNode?.getComputedHeight() ?? 50,
    [containerRef]
  );

  const getPageSize = useCallback(
    () => Math.min(itemCount, Math.floor(getContainerHeight() / ITEM_HEIGHT)),
    [itemCount, getContainerHeight]
  );

  useEffect(() => {
    setViewport([0, getPageSize()]);
    // console.log(getPageSize(), getContainerHeight(), Math.floor(getContainerHeight() / ITEM_HEIGHT))
  }, [getPageSize]);

  useEffect(() => {
    if (focusItem < viewPort[0] + 1) {
      setViewport([viewPort[0] - 1, viewPort[1] - 1]);
      focusManager.disableFocus();
      focusManager.enableFocus();
    } else if (focusItem > viewPort[1] - 1) {
      setViewport([viewPort[0] + 1, viewPort[1] + 1]);
      focusManager.disableFocus();
      focusManager.enableFocus();
    }
  }, [focusItem]);

  const onRerender = useCallback(() => {
    itemsRef.current = [];
  }, []);

  const registerItem = useCallback((item: DOMElement) => {
    itemsRef.current.push(item);
  }, []);

  const onChangeFocus = useCallback((index: number) => {
    setFocusItem(index);
  }, [focusItem]);

  return {
    containerRef,
    onRerender,
    registerItem,
    onChangeFocus,
    viewPort,
  }
}