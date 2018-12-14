'use strict';

const BoxCommand = require('../../../box-command');
const { flags } = require('@oclif/command');

class StoragePoliciesListAssignmentsCommand extends BoxCommand {
	async run() {
		const { flags, args } = this.parse(StoragePoliciesListAssignmentsCommand);
		let options = {
			targetType: flags.type
		};

		let assignment = await this.client.storagePolicies.getAssignmentForTarget(args.id, options);
		await this.output(assignment);
	}
}

StoragePoliciesListAssignmentsCommand.description = 'Look up which storage policy an object is assigned to';

StoragePoliciesListAssignmentsCommand.flags = {
	...BoxCommand.flags,
	type: flags.string({
		required: true,
		description: 'Type of object to look up the storage policy for',
		options: [
			'user',
			'enterprise'
		],
		default: 'user',
	})
};

StoragePoliciesListAssignmentsCommand.args = [
	{
		name: 'id',
		required: true,
		hidden: false,
		description: 'ID of the object to look up the storage policy for',
	}
];

module.exports = StoragePoliciesListAssignmentsCommand;
