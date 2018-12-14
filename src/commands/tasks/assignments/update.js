'use strict';

const BoxCommand = require('../../../box-command');
const { flags } = require('@oclif/command');

class TaskAssignmentsUpdateCommand extends BoxCommand {
	async run() {
		const { flags, args } = this.parse(TaskAssignmentsUpdateCommand);
		let options = {};

		if (flags.message) {
			options.message = flags.message;
		}
		if (flags.completed) {
			options.resolution_state = this.client.tasks.resolutionStates.COMPLETE;
		} else if (flags.incomplete) {
			options.resolution_state = this.client.tasks.resolutionStates.INCOMPLETE;
		} else if (flags.approved) {
			options.resolution_state = this.client.tasks.resolutionStates.APPROVED;
		} else if (flags.rejected) {
			options.resolution_state = this.client.tasks.resolutionStates.REJECTED;
		}
		if (flags.status) {
			options.resolution_state = flags.status;
		}

		let assignment = await this.client.tasks.updateAssignment(args.id, options);
		await this.output(assignment);
	}
}

TaskAssignmentsUpdateCommand.aliases = [ 'task-assignments:update' ];

TaskAssignmentsUpdateCommand.description = 'Update a task assignment';

TaskAssignmentsUpdateCommand.flags = {
	...BoxCommand.flags,
	message: flags.string({
		description: 'A message from the assignee about this task'
	}),
	status: flags.string({
		description: 'Set the resolution state of the task assignment',
		exclusive: [
			'completed',
			'incomplete',
			'approved',
			'rejected'
		],
		options: [
			'completed',
			'incomplete',
			'approved',
			'rejected'
		],
	}),
	completed: flags.boolean({
		description: 'Change resolution state to completed',
		hidden: true,
		exclusive: [
			'incomplete',
			'approved',
			'rejected',
			'status'
		]
	}),
	incomplete: flags.boolean({
		description: 'Change resolution state to incomplete',
		hidden: true,
		exclusive: [
			'rejected',
			'approved',
			'completed',
			'status'
		]
	}),
	approved: flags.boolean({
		description: 'Change resolution state to approved',
		hidden: true,
		exclusive: [
			'incomplete',
			'completed',
			'rejected',
			'status'
		]
	}),
	rejected: flags.boolean({
		description: 'Change resolution state to rejected',
		hidden: true,
		exclusive: [
			'incomplete',
			'approved',
			'completed',
			'status'
		]
	})
};

TaskAssignmentsUpdateCommand.args = [
	{
		name: 'id',
		required: true,
		hidden: false,
		description: 'ID of the task assignment to update',
	}
];

module.exports = TaskAssignmentsUpdateCommand;
