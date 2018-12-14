'use strict';

const BoxCommand = require('../../box-command');
const { flags } = require('@oclif/command');
const chalk = require('chalk');

class TokensRevokeCommand extends BoxCommand {
	async run() {
		const { flags, args } = this.parse(TokensRevokeCommand);

		let response = await this.sdk.revokeTokens(args.token);

		if (response.statusCode === 200) {
			this.info(chalk`{green Token revoked.}`);
		} else {
			this.info(chalk`{redBright Error revoking token!  ${response.body.error_description}}`);
		}
	}
}

TokensRevokeCommand.description = 'Revoke a token.  The token will no longer be valid for making API calls.';

TokensRevokeCommand.args = [
	{
		name: 'token',
		required: true,
		hidden: false,
		description: 'The token to revoke'
	}
];

TokensRevokeCommand.flags = {
	...BoxCommand.minFlags,
};

module.exports = TokensRevokeCommand;
