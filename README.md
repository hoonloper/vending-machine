## 🥫 순수 자바스크립트 자판기

### 🏃 자판기 실행
```bash
node ./app/App
```

![시작화면](./image/screen.png)

### 🌊 흐름도
![흐름도](./image/flow_chart.png)

### 📁 폴더 구조
🟢 - 테스트 코드 작성<br />
🔴 - 테스트 코드 미작성<br />
❌ - 테스트 X

```bash
.
├── README.md
├── app
│   ├── App.js ❌
│   ├── Launcher.js 🔴
│   ├── LauncherLogger.js 🔴
│   ├── common
│   │   ├── CustomError.js 🟢
│   │   ├── constant.js ❌
│   │   └── utils.js 🟢
│   ├── models
│   │   ├── Card.js 🟢
│   │   ├── Cash.js 🟢
│   │   ├── Drink.js 🟢
│   │   └── DrinkManager.js 🟢
│   └── stages
│       ├── CardStage.js 🔴
│       ├── CashStage.js 🔴
│       ├── DrinkStage.js 🔴
│       ├── PaymentStage.js 🔴
│       └── StageManager.js 🔴
└── specs (테스트)
    ├── common
    │   ├── CustomError.spec.js
    │   └── utils.spec.js
    ├── models
    │   ├── Card.spec.js
    │   ├── Cash.spec.js
    │   ├── Drink.spec.js
    │   └── DrinkManager.spec.js
    └── runner.spec.js
```
### 📊 테스트

**전체 테스트 실행**
```bash
node --experimental-test-coverage ./specs/runner.spec
```

**개별 테스트 실행 (common)**
```bash
node ./specs/common/CustomError.spec
node ./specs/common/utils.spec
```

**개별 테스트 실행 (models)**
```bash
node ./specs/models/Card.spec
node ./specs/models/Cash.spec
node ./specs/models/Drink.spec
node ./specs/models/DrinkManager.spec
```

![테스트 달성률](./image/test_coverage.png)
