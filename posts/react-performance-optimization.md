---
title: "React 성능 최적화: 개발자 가이드"
excerpt: "더 나은 성능과 사용자 경험을 위한 React 애플리케이션 최적화 고급 기법을 배워보세요."
date: "2024-01-20"
author: "Tech Blog Team"
tags: ["React", "성능", "최적화", "JavaScript"]
category: "React"
featured: false
---

성능은 현대 웹 애플리케이션에서 매우 중요합니다. 사용자들은 빠르고 반응성이 좋은 인터페이스를 기대하며, 검색 엔진 또한 성능이 좋은 사이트를 선호합니다. 이 포괄적인 가이드에서는 React 애플리케이션의 성능을 최대한 최적화하는 다양한 기법들을 살펴보겠습니다.

## React 성능 이해하기

React의 가상 DOM(Virtual DOM)과 재조정(Reconciliation) 알고리즘은 빠르게 동작하도록 설계되었지만, 잘못 작성된 컴포넌트는 여전히 성능 문제를 일으킬 수 있습니다. 일반적인 문제들은 다음과 같습니다:

- 불필요한 리렌더링
- 매 렌더링마다 발생하는 과도한 계산
- 큰 번들 크기
- 메모리 누수
- 비효율적인 리스트 렌더링

## 성능 측정하기

최적화하기 전에 측정이 필요합니다. React는 성능 분석을 위한 여러 도구를 제공합니다:

### React DevTools Profiler

```jsx
import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration) {
  console.log('Component:', id, 'Phase:', phase, 'Duration:', actualDuration);
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <MyComponent />
    </Profiler>
  );
}
```

### Web Vitals

```jsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## 컴포넌트 최적화 기법

### 1. React.memo

함수형 컴포넌트의 불필요한 리렌더링을 방지합니다:

```jsx
import React, { memo } from 'react';

const ExpensiveComponent = memo(({ data, config }) => {
  return (
    <div>
      {/* Expensive rendering logic */}
      {data.map(item => (
        <ComplexItem key={item.id} item={item} config={config} />
      ))}
    </div>
  );
});

// 커스텀 비교 함수
const ExpensiveComponentWithCustomCompare = memo(
  ({ data, config }) => {
    // 컴포넌트 로직
  },
  (prevProps, nextProps) => {
    return (
      prevProps.data.length === nextProps.data.length &&
      prevProps.config.theme === nextProps.config.theme
    );
  }
);
```

### 2. useMemo Hook

비용이 많이 드는 계산을 메모이제이션합니다:

```jsx
import { useMemo } from 'react';

function DataProcessor({ items, filters }) {
  const processedData = useMemo(() => {
    return items
      .filter(item => filters.includes(item.category))
      .sort((a, b) => a.priority - b.priority)
      .map(item => ({
        ...item,
        displayName: `${item.name} (${item.category})`
      }));
  }, [items, filters]);

  return (
    <div>
      {processedData.map(item => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
```

### 3. useCallback Hook

자식 컴포넌트의 리렌더링을 방지하기 위해 함수 참조를 메모이제이션합니다:

```jsx
import { useCallback, useState } from 'react';

function TodoList({ todos }) {
  const [filter, setFilter] = useState('all');

  const handleToggle = useCallback((id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  const handleDelete = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
```

## 리스트 렌더링 최적화

### 1. 올바른 Key 사용법

```jsx
// ❌ 나쁨: 배열 인덱스를 key로 사용
{items.map((item, index) => (
  <Item key={index} data={item} />
))}

// ✅ 좋음: 안정적이고 고유한 식별자 사용
{items.map(item => (
  <Item key={item.id} data={item} />
))}

// ✅ 좋음: 필요한 경우 복합 키 사용
{items.map(item => (
  <Item key={`${item.category}-${item.id}`} data={item} />
))}
```

### 2. 가상 스크롤링

큰 리스트의 경우 가상 스크롤링을 구현합니다:

```jsx
import { FixedSizeList as List } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <ItemCard data={items[index]} />
    </div>
  );

  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={120}
      itemData={items}
    >
      {Row}
    </List>
  );
}
```

## 상태 관리 최적화

### 1. 상태 지역화

상태를 사용되는 곳에 최대한 가깝게 위치시킵니다:

```jsx
// ❌ 나쁨: 트리에서 상태가 너무 높은 위치에 있음
function App() {
  const [userProfile, setUserProfile] = useState(null);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [notifications, setNotifications] = useState([]);

  return (
    <div>
      <Header notifications={notifications} />
      <UserProfile profile={userProfile} />
      <ShoppingCart cart={shoppingCart} />
    </div>
  );
}

// ✅ 좋음: 상태 지역화
function App() {
  return (
    <div>
      <Header /> {/* 자체적으로 알림을 관리 */}
      <UserProfile /> {/* 자체적으로 프로필 데이터를 관리 */}
      <ShoppingCart /> {/* 자체적으로 장바구니 상태를 관리 */}
    </div>
  );
}
```

### 2. 상태 정규화

복잡한 상태 구조를 정규화합니다:

```jsx
// ❌ 나쁨: 중첩된 상태 구조
const [posts, setPosts] = useState([
  {
    id: 1,
    title: 'Post 1',
    author: { id: 1, name: 'John' },
    comments: [
      { id: 1, text: 'Great post!', author: { id: 2, name: 'Jane' } }
    ]
  }
]);

// ✅ 좋음: 정규화된 상태
const [entities, setEntities] = useState({
  posts: {
    1: { id: 1, title: 'Post 1', authorId: 1, commentIds: [1] }
  },
  users: {
    1: { id: 1, name: 'John' },
    2: { id: 2, name: 'Jane' }
  },
  comments: {
    1: { id: 1, text: 'Great post!', authorId: 2 }
  }
});
```

## 코드 분할과 지연 로딩

### 1. 라우트 기반 코드 분할

```jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### 2. 컴포넌트 기반 코드 분할

```jsx
import { lazy, Suspense } from 'react';

const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard({ showChart }) {
  return (
    <div>
      <h1>Dashboard</h1>
      {showChart && (
        <Suspense fallback={<ChartSkeleton />}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}
```

## 번들 최적화

### 1. 트리 쉐이킹

```jsx
// ❌ 나쁨: 전체 라이브러리를 임포트
import * as _ from 'lodash';

// ✅ 좋음: 필요한 것만 임포트
import { debounce, throttle } from 'lodash';

// ✅ 더 좋음: 특정 임포트 사용
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
```

### 2. 동적 임포트

```jsx
// 유틸리티를 위한 동적 임포트
async function handleExport() {
  const { exportToCSV } = await import('./utils/export');
  exportToCSV(data);
}

// 라이브러리를 위한 동적 임포트
async function loadChart() {
  const ChartLibrary = await import('heavy-chart-library');
  return ChartLibrary.default;
}
```

## 이미지 및 에셋 최적화

### 1. 이미지 지연 로딩

```jsx
import { useState, useRef, useEffect } from 'react';

function LazyImage({ src, alt, placeholder }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className="image-container">
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          style={{ opacity: isLoaded ? 1 : 0 }}
        />
      )}
      {!isLoaded && <div className="placeholder">{placeholder}</div>}
    </div>
  );
}
```

### 2. 점진적 이미지 로딩

```jsx
function ProgressiveImage({ lowQualitySrc, highQualitySrc, alt }) {
  const [currentSrc, setCurrentSrc] = useState(lowQualitySrc);
  const [isHighQualityLoaded, setIsHighQualityLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setCurrentSrc(highQualitySrc);
      setIsHighQualityLoaded(true);
    };
    img.src = highQualitySrc;
  }, [highQualitySrc]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={`progressive-image ${isHighQualityLoaded ? 'loaded' : 'loading'}`}
    />
  );
}
```

## 메모리 누수 방지

### 1. 이벤트 리스너 정리

```jsx
import { useEffect } from 'react';

function WindowResizeComponent() {
  useEffect(() => {
    function handleResize() {
      console.log('Window resized');
    }

    window.addEventListener('resize', handleResize);
    
    // 정리
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div>반응형 컴포넌트</div>;
}
```

### 2. 비동기 작업 취소

```jsx
import { useEffect, useState } from 'react';

function DataFetcher({ url }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      try {
        const response = await fetch(url, {
          signal: abortController.signal
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Fetch error:', error);
        }
      }
    }

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}
```

## 성능 모니터링

### 1. 커스텀 성능 Hook

```jsx
import { useEffect, useState } from 'react';

function usePerformanceMonitor(componentName) {
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount(prev => prev + 1);
  });

  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      console.log(`${componentName} render time: ${endTime - startTime}ms`);
    };
  });

  console.log(`${componentName} rendered ${renderCount} times`);
}

// 사용법
function MyComponent() {
  usePerformanceMonitor('MyComponent');
  
  return <div>컴포넌트 내용</div>;
}
```

## 모범 사례 요약

1. **먼저 측정하기**: React DevTools와 성능 API를 사용하세요
2. **렌더링 최적화**: React.memo, useMemo, useCallback을 적절히 사용하세요
3. **코드 분할**: 지연 로딩과 코드 분할을 구현하세요
4. **상태 관리**: 상태를 지역적이고 정규화된 형태로 유지하세요
5. **리스트 처리**: 적절한 키와 큰 데이터셋에 대한 가상 스크롤링을 사용하세요
6. **에셋 최적화**: 이미지 지연 로딩과 점진적 로딩을 사용하세요
7. **누수 방지**: 이벤트 리스너와 비동기 작업을 항상 정리하세요
8. **성능 모니터링**: 프로덕션에서 성능 추적을 구현하세요

## 결론

React 성능 최적화는 애플리케이션의 특정 요구사항과 병목지점을 이해해야 하는 지속적인 과정입니다. 측정과 프로파일링부터 시작해서 전략적으로 최적화를 적용하세요. 성급한 최적화는 때로는 큰 이점 없이 코드를 더 복잡하게 만들 수 있다는 점을 기억하고, 항상 변경사항의 영향을 측정하세요.

이러한 기법과 모범 사례를 따르면 복잡성과 규모가 커져도 뛰어난 사용자 경험을 제공하는 React 애플리케이션을 구축할 수 있습니다.