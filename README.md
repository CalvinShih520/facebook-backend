# Facebook Backend Server

## 項目簡介
這是一個基於 Express 和 MongoDB 的 Node.js 後端伺服器，為社交媒體應用程式提供 API 和數據庫服務。

#
## clone項目
要clone repo
```
git clone facebook-backend
cd facebook-backend
```
### 安裝依賴
確保已安裝 PNPM，然後運行以下命令來安裝項目的所有依賴：
```
pnpm install
```
### 配置環境變數
在專案的根目錄中建立一個 .env 檔案，用於存儲敏感的環境變數。確保這個檔案不會被版本控制系統跟蹤。以下是 .env 檔案的示例內容：
```
MONGO_URL=mongodb+srv://<使用者名稱>:<密碼>@cluster0.mongodb.net/?retryWrites=true&w=majority
PORT=8080  // 如果需要，可以修改
```
確保在 .gitignore 檔案中包含 .env，以防止敏感信息被提交到版本控制系統。

### 運行伺服器
在配置環境變數之後，使用以下命令啟動伺服器：
```
pnpm start
```
伺服器應該在指定的埠上運行。預設情況下，您可以在瀏覽器中訪問 http://localhost:8080/。

### 資料庫設置
為確保 MongoDB Atlas 的連接正常，請注意以下事項：

確保 MongoDB Atlas 集群正常運行。
檢查 Atlas 控制台的 "Network Access"，確保您的公共 IP 地址已在白名單上。
如果使用本地 MongoDB，確保 MongoDB 服務正在運行。

## 常見問題

### 伺服器無法啟動
確保已經安裝了 PNPM。
檢查是否正確配置了 .env 檔案中的環境變數。
確保使用 pnpm install 重新安裝了依賴。

### 無法連接到 MongoDB
檢查 MongoDB Atlas 集群是否正常運行。
檢查 MongoDB 連接字串是否正確。
確保您的 IP 地址在 Atlas 的白名單上。

## 貢獻指南
如果您想要對項目做出貢獻，請遵循以下步驟：
Fork 本倉庫。
建立一個新分支來進行更改。
在該分支上提交您的代碼和更改。
創建 Pull Request，並描述您所做的更改。

## 許可證
該項目使用 MIT 許可證。請查看 LICENSE 檔案以獲取更多信息。

## 相關資源
MongoDB Atlas 文檔
Express 文檔