# 起動方法

```bash:
docker-compose up -d; npm run start:dev
```

<http://localhost:81/>に接続。

Email: <nestjs@example.com>
Pass: password

## Table

pgAdmin
flea-market>Databases>postgres>Schemas>public>Tables

## table 作成/追加

1. entity の作成。
2. relation ファイルの作成。

   ```bash:
   npx typeorm migration:generate -n <CreateItem>
   ```

   - 追加の場合は以下。

   ```bash:
   npx typeorm migration:generate -n AddRelation
   ```

3. migration の実行。

   ```bash:
   npx typeorm migration:run
   ```

4. pgAdmin でテーブルの確認。
