# Trip-Main 프로젝트

Trip-Main 프로젝트는 리액트 (프론트엔드)와 스프링 부트 (백엔드)를 사용하여 개발한 웹 애플리케이션입니다. Oracle 데이터베이스를 활용하고 JPA와 Querydsl을 통한 DB 관리를 지원합니다. 이 문서는 프로젝트에 대한 정보와 사용 방법을 제공합니다.

## 주요 기술 스택

### 백엔드:

- 스프링 부트
- JPA (Java Persistence API)
- Querydsl
- 데이터베이스: Oracle
- IDE: IntelliJ IDEA 또는 Eclipse

### 프론트엔드:

- 리액트
- IDE: Visual Studio Code (VSCode)

## 프로젝트 설명

Trip-Main 프로젝트는 여행 및 일정 관리를 위한 웹 애플리케이션입니다. 사용자는 리액트 기반의 사용자 친화적인 인터페이스를 통해 여행 일정을 계획하고 관리할 수 있습니다. 스프링 부트를 사용한 백엔드는 Oracle 데이터베이스와 연동하여 데이터를 신속하게 관리합니다.

## 사용 방법

1. 백엔드 설정:

   - 백엔드는 스프링 부트로 구축되었습니다. 백엔드 폴더에서 IDE를 열고 애플리케이션을 실행합니다.

2. 프론트엔드 설정:

   - 프론트엔드는 리액트로 작성되었습니다. 프론트엔드 폴더에서 다음 명령을 실행하여 의존성을 설치하고 앱을 시작합니다:

     ```bash
     npm install
     npm start
     ```

3. 데이터베이스 설정:

   - Oracle 데이터베이스를 설치하고 `application.properties` 파일에서 데이터베이스 연결 정보를 구성합니다.

4. 앱 사용:

   - 웹 브라우저에서 `http://localhost:포트번호`로 앱에 접속합니다. 여행 일정을 계획하고 관리하는 기능을 사용해보세요.

## 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다. 자세한 정보는 [LICENSE.md](LICENSE.md) 파일을 확인하세요.

## 기여

이 프로젝트에 기여하려면 GitHub 저장소를 Fork하여 개선 제안 또는 버그 보고서를 제출하세요. [CONTRIBUTING.md](CONTRIBUTING.md) 파일을 참조하여 기여 지침을 확인하세요.

## 추가 정보

- 프로젝트 위키: [Wiki](https://github.com/yourusername/trip-main/wiki)

