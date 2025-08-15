module.exports = {
  printWidth: 100,          // ↓ nếu muốn props bọc dòng nhiều hơn: đặt 90 hoặc 80
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'all',
  semi: true,
  arrowParens: 'avoid',     // giữ như bạn đang dùng; thích nhất quán thì 'always'
  bracketSpacing: true,
  bracketSameLine: false,   // đóng > của JSX ở dòng mới (Prettier 3)
  endOfLine: 'lf'
};
