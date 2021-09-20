---
title: '내가 Intersection Observer 사용하는 방법'
date: 2021-09-21 20:24:00
category: 'React'
draft: false
---

## Intersection Observer ?

`infinite scroll`, `lazy loading` 등 특정 요소가 보이는지 감지하는 것은 다양한 이유로써 사용된다.

이를 위해 단순 scroll을 감지하여 사용할 수도 있지만, 성능적인 문제로 `Intersection Observer` 사용을 권장한다.

**MDN**에서는 Intersection Observer를 다음과 같이 설명한다.

> Intersection Observer API 의 IntersectionObserver 인터페이스는 대상 요소와 그 상위 요소 혹은 최상위 도큐먼트인 viewport와의 교차 영역에 대한 변화를 비동기적으로 감지할 수 있도록 도와줍니다.

이론적인 부분은 약술하고 내가 React, TypeScript 환경에서 Intersection Observer를 사용하는 방법을 공유하고자 한다.

_[Scroll listener와 Intersection Observer의 performance 비교 결과](https://itnext.io/1v1-scroll-listener-vs-intersection-observers-469a26ab9eb6)_

## 첫 번째 접근

- useIntersectionObserver.ts

```ts
import { useEffect } from "react";

interface useIntersectionObserverProps {
  root?: null;
  rootMargin?: string;
  threshold?: number;
  target: HTMLElement;
  onIntersect: IntersectionObserverCallback;
}

const useIntersectionObserver = ({
  root,
  rootMargin = '0px',
  threshold = 1,
  target
  onIntersect,
}: useIntersectionObserverProps) => {
  useEffect(() => {
    if (!target) return;

    const observer: IntersectionObserver = new IntersectionObserver(
      onIntersect,
      { root, rootMargin, threshold }
    );
    observer.observe(target);

    return () => observer.unobserve(target);
  }, [onIntersect, root, rootMargin, target, threshold]);
};

export default useIntersectionObserver;
```

- 사용하는곳.tsx

```tsx
import { useRef } from 'react';
import useIntersectionObserver from 'hooks/useIntersectionObserver';

const Foo = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    console.log(`감지결과 : ${isIntersecting}`);
  };

  useIntersectionObserver({ target: targetRef.current, onIntersect });

  return <div ref={targetRef}></div>;
};
```

첫 번째로 접근한 방법은 Intersection Observer의 Option들을 Props로 받을 수 있는 `Custom Hook`을 이용하면서

사용하는 곳에서 감지를 당할 **HTMLElement ref의 current값**을 Props로 활용하는 방법으로 접근하였다.

## 하지만

`useIntersectionObserver`를 보면 다음과 같은 줄이 있다.

```ts
if (!target) return;
```

감지할 대상이 falsy하면 observer를 생성, 이용하지 못하도록 반환하는 역할을 한다.

하지만 `사용하는곳.ts`에서 ref에 초기 값이 null로써, 반환되어 감지되지 못한다.

> 그럼 useEffect dependency에 target.current 를 걸면 되지 않나 ?

결론부터 말하자면 안된다. current 값이 할당되어 재실행되어도, Layout이 그러졌다는 것을 뜻하진 않기 때문이라고 한다.

## 해결 방법

React 공식문서는 ref가 설정, 해제되는 상황을 다룰 때 `Callback ref`라 불리는 방법을 제공한다.

내 적용 방법은 다음과 같다.

- useIntersectionObserver.ts

```ts
import { useEffect, useState } from 'react';

interface useIntersectionObserverProps {
  root?: null;
  rootMargin?: string;
  threshold?: number;
  onIntersect: IntersectionObserverCallback;
}

const useIntersectionObserver = ({
  root,
  rootMargin = '0px',
  threshold = 0,
  onIntersect,
}: useIntersectionObserverProps) => {
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);

  useEffect(() => {
    if (!target) return;

    const observer: IntersectionObserver = new IntersectionObserver(
      onIntersect,
      { root, rootMargin, threshold }
    );
    observer.observe(target);

    return () => observer.unobserve(target);
  }, [onIntersect, root, rootMargin, target, threshold]);

  return { setTarget };
};

export default useIntersectionObserver;
```

- 사용하는곳.ts

```tsx
import useIntersectionObserver from 'hooks/useIntersectionObserver';

const Foo = () => {
  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    console.log(`감지결과 : ${isIntersecting}`);
  };

  const { setTarget } = useIntersectionObserver({ onIntersect });

  return <div ref={setTarget}></div>;
};
```

`Callback ref`의 역할로 useState의 `setState`를 위임하였으며,

감지 요소에 대한 위임을 `useIntersectionObserver`가 하고 있어 사용하는 곳에서는 더욱 간결해진 모습이다.

## 마치며

이 방법이 제일 좋은 방법, 즉 흔히 말하는 `Best Practice`인지는 확답을 드릴 수 없다.

하지만 이 글을 읽고 해당 방법에 대한 단점, 더욱 좋은 해결 방법을 공유해주셨으면 하는 마음과 함께

아직 해결하지 못한 분들에게 도움이 되고자 블로그 글을 게시해본다.
