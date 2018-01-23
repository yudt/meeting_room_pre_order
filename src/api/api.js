import { httpClient } from './base';

export default {
	get_meeting_room_pre_order(params) {
		return httpClient.get('',
		{
			params: params,
			headers:{
				"Content-Type" : "application/json"
			}
		});
	},
	pre_order_meeting_room(params) {
		return httpClient.post('', params, 
		{
			headers:{
				"Content-Type" : "application/json"
			}
		})
	}
}