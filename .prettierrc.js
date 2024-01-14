module.exports = {
  printWidth: 170,
  tabWidth: 2,
  trailingComma: "es5",
  singleQuote: false,
  semi: false,
  plugins: [require.resolve("@trivago/prettier-plugin-sort-imports")],
  importOrder: ["^w3ts(.*)", "<THIRD_PARTY_MODULES>"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
}
