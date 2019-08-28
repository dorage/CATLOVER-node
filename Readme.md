[Hottie]

-   예쁜 여자를 볼 수 있는 사이트

[Task]

-   crawler로 부터 post list 받아오는것 만들기 [취소]
    -   POST하는 post json 바꿔주기 (instagram 정보하고 girl 정보가 들어있어야함) [취소]
    -   instagram 계정이 여러개 있을 수 있으니까 [취소]
-   task ui - 실제 task가 보이게 변경 [v]
-   task reset 라우터 추가 [완료] 20190802
-   task에 instagram이 들어감 [완료] 20190802
-   crawler 반환값 instagram posts에 때려밖기 [완료]
-   부모가 자식값을 모두 갖고 있는걸로 변경하기 [완료]
-   프론트용 라우터 만들기 [완료]
-   프론트 전달기준 만들기 / 모두 results로 전달 [완료]
-   api로 라우터 변경하기 [완료]
-   post에 view 카운트 추가 / 비공개요소 [완료]
-   post에 like 카운트 추가 [완료]
-   girl에 like 카운트 추가 [완료]
-   tag 모델 추가 [완료]
    -   post, girl 에 tag 모델추가 [완료]
-   (react) ImageViewer 만들기 [완료]
-   girl 정보 받아가는 api 추가 [완료]
-   likes 순위 가져오기 추가 (girl/post) [완료]
-   (react) 순위표 만들기[완료]
    -   container-presenter 로 분해 [완료]
-   (react) girl 꾸미기 [완료]
-   like 에 next 추가하기 [완료]
-   like PVC 로 변경 [완료]
-   setLike 없이 like에서 자체적으로 하기 [완료]
-   tag 수정하는 컨트롤러작성 [진행]
-   ui라우터 css / js 작업 [진행]
    -   css [완료]
    -   js [진행]
        -   tags [완료]
        -   task [완료]
        -   girls
            -   tag 추가가 가능한 모달을 만들기
            -   검색으로 추가가능
            -   tag의 대분류 추가하기
-   crawler 에서 인스타 프로필 사진 가져오기
-   로그인한 유저 많이본 / 취향의 태그 위주로 투데이픽 구성
-   login / logout - google auth 사용하기 [진행]
    -   모달 추가하기
    -   아이디값 전달하기
-   ui라우터 검색, 번호표, 다중선택 추가
-   related 라우터 추가 / related 인기이미지4개 신규이미지4개
-   검색기능추가 - 태그단위
-   model 전부 자식이 부모 도큐멘트를 가지는것으로 변경
-   < 여기서 배포하기 >
-   error 처리
-   크로울러 조금 변경하기
    -   매니저가 자식 크로울러 호출 - 멀티프로세싱
-   crawler가 update전달할때 이미 있는 부분 업데이트 제거 구현
-   crawler 가 값 반환할때 검사하기
    -   이게 맞는 크롤링인지 확인하기
    -   값이 None이 아닌지 확인해서 값이 None이면 selector가 변경된것이므로 email로 알림
-   task 를 중단시키거나 crawling 중인 데이터를 삭제할 수 있어야함
    -   crawler 분리해서 crawler 삭제기능만들기 (crawling 중단 시키기)
-   crawler 의 selector 를 api 서버에서 관리하기
-   crawler는 서버에서 값을 가져올때 json에서 selector를 전달받음
-   selector가 변경되면 크로울러가 전달

[Stack]

-   React - 프론트
-   Express - API
-   Python - 크롤링
-   MongoDB

[기능]

여자들을 보여줌
특징별로 보여줌 (백인,흑인,황인,에보니)
중간에 광고도 보여줌
모든 여자의 사진은 출처를 알려줌
여성의 프로필에서 여성의 SNS 링크를 알려줌
자신이 여성을 추가할 수 있음 (링크로)
여성이 자신을 추가할 수 있음 (링크로)
