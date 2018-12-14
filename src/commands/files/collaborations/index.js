'use strict';

const BoxCommand = require('../../../box-command');
const { flags } = require('@oclif/command');

class FilesCollaborationsListCommand extends BoxCommand {
	async run() {
		const { flags, args } = this.parse(FilesCollaborationsListCommand);
		let options = {};

		if (flags.fields) {
			options.fields = flags.fields;
		}

		let collaborations = await this.client.files.getCollaborations(args.id, options);
		await this.output(collaborations);
	}
}

FilesCollaborationsListCommand.aliases = [ 'files:collaborations:list' ];

FilesCollaborationsListCommand.description = 'List all collaborations on a file';

FilesCollaborationsListCommand.flags = {
	...BoxCommand.flags,
};

FilesCollaborationsListCommand.args = [
	{
		name: 'id',
		required: true,
		hidden: false,
		description: 'ID of the file to get collaborations for'
	}
];

module.exports = FilesCollaborationsListCommand;
