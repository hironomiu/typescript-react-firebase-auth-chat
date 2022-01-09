# typescript-react-firebase-auth-chat

TypeScript + React(create-react-app)(状態管理は全て useState) + Firebase で Authentication + Realtime Database の実装例

CSS や UI、状態管理のメインを useState ではなく Redux Toolkit などこのアプリの拡張的な実装例は[
typescript-react-redux-toolkit-firebase-auth-chat](https://github.com/hironomiu/typescript-react-redux-toolkit-firebase-auth-chat)を参照

## Create Memo

### React

```
npx create-react-app --template typescript
```

or

```
yarn create react-app --template typescript
```

### firebase

```
yarn add firebase @types/firebase
```

### react-router-dom

```
yarn add react-router-dom @types/react-router-dom
```

### GitHub

アカウント -> Settings -> Developer settings -> OAuth Apps -> New OAuth App

取得した「Client ID」「Client secrets」を Firebase Auth で設定する
