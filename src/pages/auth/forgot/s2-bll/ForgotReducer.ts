import { ForgotActionsType } from './ForgotActions';
import { ForgotInitState, ForgotStateType } from './ForgotInitState';

export const forgotReducer = (
	state = ForgotInitState,
	action: ForgotActionsType
): ForgotStateType => {
	switch (action.type) {
		default: {
			return { ...state };
		}
	}
};
