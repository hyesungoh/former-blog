---
title: 'BOJ 1976 - Python'
date: 2021-1-22 12:21:13
category: 'Algorithm'
draft: false
---
n개의 도시 중에서 m개의 도시를 방문할려고 한다. 이 때 중복된 도시도 포함될 수 있고 같은 도시에서 도시로 이동할 수도 있다. 각 도시들간을 이동할 수 있는 지 여부를 입력받은 후, m개의 도시 순서를 입력받아 해당 순서를 이동할 수 있는 지 여부를 출력하는 문제. 첫 번째 풀이는 재귀를 이용한 DFS 형태로 풀었다. 하지만 정체모를 반례로 인해 90퍼센트쯤에서 틀렸습니다. 결과를 받았다. 두 번째 풀이는 플로이드 와샬 방법으로 3중 반복문을 통해 각 도시들간 이동 여부를 저장 후 도시 순서에 따라 확인하여 풀었다. 유니온 파인드 방법을 이용하여 풀 수 있다는데 공부해야겠다.
```python
import sys
input = sys.stdin.readline

def solve():
    for i in range(m - 1):
        now = dist[i]
        next = dist[i + 1]
        if not graph[now][next]:
            return False
    return True

n = int(input())
m = int(input())
graph = [list(map(int, input().split())) for _ in range(n)]

for k in range(n):
    graph[k][k] = 1
    for i in range(n):
        for j in range(n):
                if graph[i][k] and graph[k][j]:
                    graph[i][j] = 1

dist = list(map(lambda x: int(x)-1, input().split()))

print("YES" if solve() else "NO")

```