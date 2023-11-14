## 🥫 순수 자바스크립트 자판기

### 🌊 흐름도

### 📁 폴더 구조
🟢 - 테스트 코드 작성<br />
🔴 - 테스트 코드 미작성<br />
❌ - 테스트 X

```js
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
### 📊 테스트 달성률
