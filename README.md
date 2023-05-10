# 貨幣記錄應用程式 (Money Record App)

此應用程式可幫助您追踪和管理您的每日支出。您可以使用Facebook帳號登入，並將您的消費記錄分類。

## 功能

- 註冊和登入功能（使用Facebook帳號登入）
- 增加、編輯和刪除消費記錄
- 依類別篩選消費記錄
- 統計指定類別的總支出金額

## 安裝與執行

### 環境要求

- Node.js v14.0.0 或更高版本
- MongoDB v4.0.0 或更高版本

### 安裝步驟

1. 下載或克隆此專案至本地端

```
git clone https://github.com/Banwind/expense_tracker.git
```

2. 在專案資料夾中，執行以下命令安裝所需的依賴套件

```
npm install
```

3. 在專案資料夾中，建立一個名為`.env`的檔案，並設置以下環境變數：

```
FACEBOOK_ID=你的Facebook應用程式ID
FACEBOOK_SECRET=你的Facebook應用程式密鑰
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
```

4. 啟動MongoDB資料庫

5. 使用以下命令執行資料庫種子檔案：

```
npm run seed
```
6. 使用以下命令啟動應用程式：

```
npm run dev
```


7. 在瀏覽器中，前往`http://localhost:3000`以查看和使用應用程式。

## 使用技術

- Node.js
- Express
- MongoDB
- Mongoose
- Passport
- Facebook OAuth
- bcryptjs
- express-handlebars
- express-session
- connect-flash
- dotenv

## 開發者

Ben Wang

## 授權

此專案使用MIT授權。有關詳細信息，請參閱[LICENSE](LICENSE)文件。

