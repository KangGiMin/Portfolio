# 강기민 포트폴리오

`index.html`을 브라우저로 열면 바로 실행되는 정적 포트폴리오입니다. 별도 설치나 빌드가 필요하지 않습니다.

## 파일 구성

- `index.html`: 소개, 기술, 프로젝트, 교육 이력, GitHub 연결 및 프로젝트 상세 내용
- `styles.css`: 반응형 레이아웃, 라이트·다크 테마
- `script.js`: 테마 저장, 모바일 메뉴, 기술별 필터, 프로젝트 상세 대화상자
- `assets/images/`: 원본 GitHub README에서 가져온 실제 프로젝트 화면
- `assets/fonts/`: 로컬 Pretendard 폰트와 SIL Open Font License
- `assets/favicon.svg`: 포트폴리오 파비콘

## GitHub에 올리기

이 폴더는 이미 `https://github.com/KangGiMin/Portfolio.git`의 기존 `main` 이력을 가져온 상태이며, `main`이 `origin/main`을 추적합니다. 원격 README는 변경하지 않았습니다. 다시 `git init`하거나 별도 초기 커밋을 만들 필요가 없습니다.

PowerShell에서 이 폴더를 연 뒤 실행합니다.

```powershell
git status
git add .
git commit -m "Build personal portfolio website"
git push origin main
```

작업 중 GitHub에서 다른 커밋을 추가했다면, 위 커밋을 만든 후 push 전에 `git pull --rebase origin main`으로 반영합니다. 강제 push는 필요하지 않습니다. `git add .`는 파일을 스테이징하는 명령이며, 원격 README가 포함된 이력에서 작업하므로 서로 다른 초기 커밋 때문에 발생하는 push 거부를 피할 수 있습니다.

## GitHub Pages 공개

push 후 GitHub의 `Portfolio` 저장소에서 **Settings → Pages → Build and deployment**로 이동합니다.

1. Source를 **Deploy from a branch**로 선택합니다.
2. Branch는 **main**, 폴더는 **/(root)**를 선택하고 저장합니다.
3. 배포가 완료되면 Pages 설정에 실제 주소가 표시됩니다. 기본 주소는 `https://kanggimin.github.io/Portfolio/`입니다.

모든 내부 리소스는 상대 경로를 사용하므로 `/Portfolio/` 하위 경로에서도 동작합니다. 자동 배포 워크플로는 별도 필요하지 않습니다.

## 내용 수정

- 소개·교육·기술: `index.html`의 각 섹션을 수정합니다.
- 프로젝트: 프로젝트 카드와 파일 하단의 `detail-*` 템플릿을 함께 수정합니다.
- 화면 이미지: `assets/images/`의 파일을 교체합니다.
- 색상: `styles.css`의 `:root`와 `[data-theme=dark]` 변수를 수정합니다.
- 연락 링크: 현재 확인 가능한 GitHub 프로필을 사용합니다. 이메일을 추가하려면 실제 주소로 `mailto:` 링크를 작성합니다.

## 내용과 이미지 출처

- [GitHub 프로필 README](https://github.com/KangGiMin/KangGiMin)
- [Don't forget README](https://github.com/KangGiMin/Don-t-forget)
- [Music Is My Life README](https://github.com/KangGiMin/Music-is-my-life)
- [ReviewPlus 2.0 README](https://github.com/KangGiMin/ReviewPlus2.0)

프로젝트 설명은 2026년 11월 13일 확인한 README를 기준으로 정리했습니다. 팀 전체 구현과 개인 담당을 구분했으며, Don't forget의 푸시 알림·소셜 로그인 등 추가 검증이 필요한 범위는 상세보기에 명시했습니다. 프로젝트 화면은 재구성한 데모가 아닌 실제 README 이미지입니다.

폰트: [Pretendard](https://github.com/orioncactus/pretendard), SIL Open Font License 1.1. 라이선스 전문은 `assets/fonts/OFL.txt`에 포함되어 있습니다.
