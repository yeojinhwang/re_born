# 06. 쿠버네티스 시작하기

### 6-1. 쿠버네티스 시작하기

#### 1) 모든 리소스는 오브젝트 형태로 관리된다.

- 쿠버네티스는 대부분의 리소스를 '오브젝트'라고 불리는 형태로 관리
- 컨테이너의 집합(pods), 컨테이너의 집합 관리하는 컨트롤러(replica set), 사용자(service account) 까지도 하나의 오브젝트로 사용

> `kubectl api-resources` : 쿠버네티스에서 사용할 수 있는 오브젝트에는 어떤 것이 있는지
>
> `kubectl explain` 특정 오브젝트의 간단한 설명



#### 2) 쿠버네티스는 명령어로도 사용할 수 있지만, YAML 파일을 더 많이 사용한다.



#### 3) 쿠버네티스는 여러 개의 컴포넌트로 구성돼 있다.

- 마스터 노드는 쿠버네티스가 제대로 동작할 수 있게 클러스터를 관리하는 역할
- 워커 노드에는 애플리케이션 컨테이너가 생성

> - 마스터 노트데이서는 API 서버(kube-apiserver), 컨트롤러 매니저(kube-controller-manager), 스케줄러(kube-scheduler), DNS 서버(core DNS) 등이 실행
>
> - 모든 노드에서는 네트워크 구성을 위해 프락시(kube-proxy)와 네트워크 플러그인 등이 실행

- 쿠버네티스 클러스터 구성을 위해 kubelet이라는 에이전트가 모든 노드에서 실행
- 반드시 도커를 사용해야 하는가? 

> OCI라는 컨테이너의 런타임 표준을 구현한 **CRI((Container Runtime Interface)** 를 갖춘다면 어떤 컨테이너도 가능

#### CRI & OCI

- 도커 기반의 쿠버네티스는 kubelet의 명령을 받아 Docker runtime을 통해서 컨테이너의 생명 주기를 관리

![image-20201217170845653](/Users/kakao_ent/Library/Application Support/typora-user-images/image-20201217170845653.png)

- 도커 이외에 컨테이너 기술들이 나오면서 다양한 컨테이너 런타임을 지원하기 위해 Kubelet의 코드 수정 문제

![image-20201217171021051](/Users/kakao_ent/Library/Application Support/typora-user-images/image-20201217171021051.png)

- kubelet과 컨테이너 런타임 사이의 인터페이스를 통일화 하는 스펙 -> **CRI(Container Runtime Interface)**

![image-20201217171121549](/Users/kakao_ent/Library/Application Support/typora-user-images/image-20201217171121549.png)

- CRI 자체를 표준화하려는 스펙 -> **OCI(Open Container Initiative)**

  > OCI 스펙에 따른 컨테이너 런타임을 관리하는 CRI 컴포넌트는 CRI-O라는 컴포넌트로 구현

  

### 6-2. 포드(Pod) : 컨테이너를 다루는 기본 단위

- 컨테이너 애플리케이션의 기본 단위를 포드(Pod)라고 부르며, 포드는 1개 이상의 컨테이너로 구성된 컨테이너의 집합

![image-20201217075441550](/Users/kakao_ent/Library/Application Support/typora-user-images/image-20201217075441550.png)

> - apiVersion : 오브젝트의 종류 및 개발 성숙도에 따라 apiVersion의 설정값이 달라짐
> - Kind : 리소스의 종류. `kubectl api-resources` 를 통해 사용할 수 있는 리소스 오브젝트 종류를 KIND 항목에서 확인
> - Metadata : 라벨, 주석, 이름 등과 같은 리소스의 부가 정보들을 입력
> - spec : 리ㅗ스를 생성하기 위한 자세한 정보를 입력

- `kubectl apply -f` 명령어로 쿠버네티스에서 생성
- `kubectl get <오브젝트 이름>` 을 사용하면 특정 오브젝트의 목록을 확인
- `kubectl describe` 명령어를 사용해 생성된 리소스의 자세한 정보 조회
- `kubectl exec` 명령으로 포드의 컨테이너에 명령어를 전달
- `kubectl logs` 명령어로 포드의 로그를 확인
- `kubectl delete -f` 명령어로 쿠버네티스 오브젝트 삭제



#### 포드 vs 도커 컨테이너

- 쿠버네티스가 포드를 사용하는 이유는 여러 **리눅스 네임스페이스**를 공유하는 여러 컨테이너들을 추상화된 집합으로 사용하는 것

> ### "Namespace"
>
> 리눅스의 namespace는 커널에서 제공하고 있으며, 하나의 시스템에서 프로세스를 격리(isolation) 시킬 수 있는 가상화 기술
>
> **Mont** : 파일 시스템 마운트 포인트를 격리
>
> **UTS** : hostname과 domainname을 격리
>
> **IPC** : interprocess communication 자원을 격리
>
> **PID** : process ID를 격리
>
> **Network** : 네트워크 인터페이스 격리
>
> **User** : UID와 GID 격리



![image-20201217080325028](/Users/kakao_ent/Library/Application Support/typora-user-images/image-20201217080325028.png)

- 대시를 사용하는 항목은 여러 개의 항목을 정의할 수 있음을 의미
- YAML 파일에서 command를 지정하면 도커 컨테이너의 Entrypoint로, 포드에서 args를 지정하면 도커 컨테이너의 Cmd로 치환

- `-C` 옵션을 사용하면 포드의 어떤 컨테이너에 대해 명령어를 수행할지 명시
- 우분투 컨테이너의 로컬호스트에서 Nginx 서버로 접근이 가능
- **네트워크 네임스페이스**는 컨테이너의 고유한 네트워크 환경을 제공해주는 역할 담당 -> 호스트 및 다른 컨테이너와 다른 고유한 IP를 유지

- 컨테이너 네트워크 타입은 네트워크 네임스페이스를 컨테이너 간에 공유해 사용하도록 설정하므로 여러 개의 컨테이너가 동일한 네트워크 환경을 가짐

![image-20201217171658810](/Users/kakao_ent/Library/Application Support/typora-user-images/image-20201217171658810.png)



####  완전한 애플리케이션으로서의 포드

"하나의 포드는 하나의 완전한 애플리케이션"

- 주 컨테이너 외에 기능 확장을 위한 추가 컨테이너를 포드에 포함 -> **사이드카(sidecar)** 컨테이너라고 부르며, 포드 내의 다른 컨테이너와 네트워크 환경 등을 공유



### 6-3. 레플리카셋(Replica Set) : 일정 개수의 포드를 유지하는 컨트롤러

>  여러 개의 포드를 직접 정의하는 것은 비효율적이며,
>
> 포드가 삭제되거나 위치한 노드에 장애가 발생해 더 이상 포드에 접근하지 못할 때 직접 포드를 삭제하고 다시 생성해야 복구 가능

- 정해진 수의 동일한 포드가 항상 실행되도록 관리
- 노드 장애 등의 이유로 포드를 사용할 수 없다면 다른 노드에서 포드를 다시 생성

![image-20201217082012815](/Users/kakao_ent/Library/Application Support/typora-user-images/image-20201217082012815.png)

- `spec.replicas` : 동일한 포드를 몇 개 유지시킬 것인지 설정
- `spec.template` : 포드를 생성할 때 사용할 템플릿을 정의

- 레플리카셋을 삭제하거나 수정하면 코드에 변경사항 반영



####  레플리카셋의 동작 원리

- **느슨한 연결(loosely coupled)** : 다른 클래스를 직접적으로 사용하는 클래스의 의존성을 최소화 -> Lebel selector

- **라벨**은 포드 등의 쿠버네티스 리소스를 분류할 때 유용하게 사용할 수 있는 메타데이터

  > 서로 다른 오브젝트가 서로를 찾아야 할 때 사용

- `kubectl edit` 모든 종류의 쿠버네티스 오브젝트에서 리소스의 속성을 변경할 수 있도록 텍스트 편집기 실행
- 레플리카 셋의 목적은 '일정 개수의 포드를 유지하는 것'

![image-20201217171824011](/Users/kakao_ent/Library/Application Support/typora-user-images/image-20201217171824011.png)



#### 레플리케이션 컨트롤러 vs 레플리카셋

레플리카셋은 "표현식(matchExpression) 기반의 라벨 셀렉터"를 이용 가능

![image-20201217083117359](/Users/kakao_ent/Library/Application Support/typora-user-images/image-20201217083117359.png)



![image-20201217171909523](/Users/kakao_ent/Library/Application Support/typora-user-images/image-20201217171909523.png)

![image-20201217171920028](/Users/kakao_ent/Library/Application Support/typora-user-images/image-20201217171920028.png)



### 6-4. 디플로이먼트(Deployment) : 레플리카셋, 포드의 배포를 관리

- 대부분 레플리카셋과 포드의 정보를 정의하는 디플로이먼트를 YAML 파일에 정의해 사용
- 디플로이먼트 > 레플리카셋 > 포드

![image-20201217083342253](/Users/kakao_ent/Library/Application Support/typora-user-images/image-20201217083342253.png)

![image-20201217171945836](/Users/kakao_ent/Library/Application Support/typora-user-images/image-20201217171945836.png)

- 애플리케이션의 업데이트와 배포를 더욱 편하게 만들기 위해 사용

  1) 레플리카셋의 변경 사항을 저장하는 리비전(revision)을 남겨 롤백 가능

  >  `--record` 옵션으로 디플로이먼트 변경하면 변경 사항을 기혹하여 해당 버전의 레플리카셋 보존
  >
  > `--to-revision` 은 되돌리려는 리비전의 번호를 입력

  ![image-20201217172011943](/Users/kakao_ent/Library/Application Support/typora-user-images/image-20201217172011943.png)

  2) 무중단 서비스를 위해 포드의 롤링 업데이트 전략을 지정



### 6-5. 서비스(Service) : 포드를 연결하고 외부에 노출

- YAML 파일에서 정의한 containerPort 항목을 외부로 노출해 사용자가 접근하거나, 다른 디플로이먼트의 포드들이 내부적으로 접근하기 위해 **service**라고 부른는 별도의 쿠버네티스 오브젝트를 생성

> - 여러 개의 포드에 쉽게 접근할 수 있도록 **고유한 도메인** 이름 부여
> - 여러 개의 포드에 접근할 때, 요청을 분산하는 **로드 밸런서** 기능 수행
> - 클ㄹ라우드 플랫폼의 로드 밸런서, 클러스터 노드의 포트 등을 통해 포드를 외부로 노출

- `kubectl get pods -o wide` 포드의 IP를 확인

**서비스 종류**

1) ClusterIP 타입 : 쿠버네티스 내부에서만 포드들에 접근할 때 사용

2) NodePort 타입 : 포드에 접근할 수 있는 포트를 클러스터의 모든 노드에 동일하게 개발

3) LoadBalancer 타입 : 클라우드 플랫폼에서 제공하는 로드 밸런서를 동적으로 프로비저닝해 포드에 연결



#### ClusterIP 타입

![image-20201217172116793](/Users/kakao_ent/Library/Application Support/typora-user-images/image-20201217172116793.png)

![image-20201217084509308](/Users/kakao_ent/Library/Application Support/typora-user-images/image-20201217084509308.png)

- `spec.selector` : 서비스에서 어떠한 라벨을 가지는 포드에 접근할 수 있게 만들 것인지 결정
- `spec.ports.port` : 쿠버네티스 내부에서만 사용할 수 있는 고유한 IP를 할당
- `spec.ports.targetPort` : 내부적으로 사용하고 있는 포트를 입력
- 서비스를 생성할 때 별도의 설정을 하지 않아도 서비스는 연결된 포드에 대해 로드 밸런싱을 수행
- 서비스는 IP뿐 아니라 서비스 이름 자체로도 접근이 가능 -> 내부 DNS를 구동
- 서비스의 라벨 셀렉터와 포드이 라벨이 매칭되면 쿠버네티스는 자동으로 **엔드포인트(Endpoint)** 오브젝트를 별도로 생성



#### NodePort 타입

![image-20201217172138021](/Users/kakao_ent/Library/Application Support/typora-user-images/image-20201217172138021.png)

- `kubectl get services`  실행 시 PORTS 항목은 모든 노드에서 동일하게 접근할 수 있는 포트를 의미
- 클러스터 내부에서는 ClusterIP 타입의 서비스와 동일하게 접근 가능
- 실제 운영 환경에서 NodePort로 서비스를 외부에 제공하는 경우 많지 않으며 **인그레스(Ingress)** 라고 부르는 쿠버네티스의 오브젝트에서 간접적으로 사용



#### LoadBalancer 타입

![image-20201217172206304](/Users/kakao_ent/Library/Application Support/typora-user-images/image-20201217172206304.png)

- 클라우드 플랫폼으로부터 도메인 이름와 IP를 할당받기 때문에 NodePort보다 쉽게 서포드에 접근
- 로드 밸런서를 동적으로 생성하는 기능을 제공하는 환경에서만 사용 가능

![image-20201217085514611](/Users/kakao_ent/Library/Application Support/typora-user-images/image-20201217085514611.png)

- `EXTERNAL -IP` : 클라우드 플랫폼으로부터 자동 할당되며, YAML 파일의 `ports.port` 를 통해 포드에 접근
- LoadBalanacer 타입의 서비스가 생성됨과 동시에 모든 워커 노드는 포드에 접근할 수 있는 랜덤한 포트를 개방



#### 트래픽 분배를 결정하는 서비스 속성 : externalTrafficPolicy

![image-20201217172229828](/Users/kakao_ent/Library/Application Support/typora-user-images/image-20201217172229828.png)

- A노드로 들어오는 요청이 b 포드로 전달되어 처리되면 불필요한 네트워크 홉이 한 단계 더 발생
- 노드 간의 리다이렉트가 발생하며 트래픽의 출발지 주소가 바뀌는 SNAT 발생

![image-20201217085941596](/Users/kakao_ent/Library/Application Support/typora-user-images/image-20201217085941596.png)

- externalTrafficPolicyfmf **Cluster(default) -> Local**로 설정하면 포드가 생성된 노드에서만 포드로 접근
- 추가적인 네트워크 홉이 발생하지 않으며, 전달되는 요청의 클라이언트 IP 보존



#### 요청을 외부로 리다이렉트하는 서비스 : ExternalName

- ExternalName 타입을 사용해 서비스를 생성하면 서비스가 외부 도메인을 가리키도록 설정 가능
- 쿠버네티스와 별개로 존재하는 레거시 시스템에 연동해야 하는 상황에서 유용하게 사용
- CNAME 레코드는 도메인을 가리키는 다름 이름을 의미
  - A 레코드는 도메인 이름이 직접 IP로 변환되는 경우를 의미



#### 과제



**실행순서**

1. mongodb
2. backend (mongodb를 바라봄)
3. frontend (backend를 바라봄)

**frontend**

| 정보                   | 내용                               |
| ---------------------- | ---------------------------------- |
| 이미지                 | subicura/guestbook-frontend:latest |
| 리스닝 포트            | `PORT` 환경변수                    |
| PORT ENV               | 리스닝 포트로 설정                 |
| GUESTBOOK_API_ADDR ENV | Backend 서버 주소 ex) backend:8000 |

**backend**

| 정보                  | 내용                              |
| --------------------- | --------------------------------- |
| 이미지                | subicura/guestbook-backend:latest |
| 리스닝 포트           | `PORT` 환경변수                   |
| PORT ENV              | 리스닝 포트로 설정                |
| GUESTBOOK_DB_ADDR ENV | DB 서버 주소 ex) mongodb:27017    |

**mongodb**

| 정보        | 내용    |
| ----------- | ------- |
| 이미지      | mongo:4 |
| 리스닝 포트 | 27017   |



**deployment**

| 정보  | 내용      |
| ----- | --------- |
| pod   | 3         |
| Label | Webserver |



**service**

| 정보 | 내용     |
| ---- | -------- |
| Type | NodePort |

