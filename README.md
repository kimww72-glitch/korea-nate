# KoreaMate

외국인 관광객을 위한 한국 현지 동행 서비스의 모바일 우선 웹사이트입니다.

## 실행

Node.js 20 이상이 설치된 환경에서 아래 명령을 실행합니다.

```bash
pnpm install
pnpm dev
```

프로덕션 결과물 생성:

```bash
pnpm build
```

## Vercel 배포

이 프로젝트는 Vercel용 설정을 포함합니다. GitHub에 이 프로젝트를 올린 뒤 Vercel에서 해당 저장소를 Import하면 됩니다. Vercel은 `pnpm run build`를 실행하고 `dist` 폴더를 배포합니다.

또는 Vercel CLI에서 프로젝트 폴더를 연 뒤 아래 명령으로 배포할 수 있습니다.

```bash
pnpm dlx vercel
```

## 포함된 흐름

- 한국어, English, 中文 언어 전환
- 음식 탐방, 쇼핑 동행, K-POP 굿즈, 서울 도시 여행, 통역/동행 서비스
- 서비스 선택 → 이용 시간 설정 → 날짜/인원 입력 → 메이트 찾기
- 모바일 우선 반응형 레이아웃
