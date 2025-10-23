// @ts-check

/** @type {import("prettier").Config} */
module.exports = {
	quoteProps: 'consistent',
	singleAttributePerLine: true,
	// Since prettier 3.0, manually specifying plugins is required
	plugins: ['@ianvs/prettier-plugin-sort-imports'],
	// This plugin's options
	importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
	importOrderTypeScriptVersion: '5.0.0',
};
