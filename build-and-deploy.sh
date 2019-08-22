npm run build:prod
rm -rf ../tomowallet-backend/applications/wallet-web
cp -r ./dist/prod ../tomowallet-backend/applications/wallet-web