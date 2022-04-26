import { RegisterActionsType } from './RegisterActions';
import { RegisterInitState, RegisterStateType } from './RegisterInitState';

export const loginReducer = (
	state = RegisterInitState,
	action: RegisterActionsType
): RegisterStateType => {
	switch (action.type) {
		default: {
			return { ...state };
		}
	}
};
