# ⚓ 'Catch of the day' App
A sample / tutorial app made doing the 'React for beginners' course by Wes Bos.

## 📝 Notes

### 26. 🚀 Deployment to now.sh
Deployment to .sh changed since serve-now is deprecated. The `package.json` should be modified to contain the follwoing:

```
{
  "scripts": {
    "start": "serve ./build --single",
    "build": "react-scripts build"
  },
  "dependencies": {
    "serve": "latest"
  }
}
```