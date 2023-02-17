import {
	Client,
	ClientConfig,
	CreateClientConfig,
	User,
	UploadRequestOptions,
	UploadRequestOptionsWithProfile,
	OperationMetadata,
	OperationsDefinition,
	OperationRequestOptions,
	SubscriptionRequestOptions,
	SubscriptionEventHandler,
	FetchUserRequestOptions,
} from "@wundergraph/sdk/client";
import type {
	AlldrugsResponse,
	AlldrugsResponseData,
	CreateUserResponse,
	CreateUserInput,
	CreateUserResponseData,
	DragonsResponse,
	DragonsResponseData,
	LoginResponse,
	LoginInput,
	LoginResponseData,
	NewDrugResponse,
	NewDrugResponseData,
	UsersGetResponse,
	UsersGetInput,
	UsersGetResponseData,
	UsersSubscribeResponse,
	UsersSubscribeInput,
	UsersSubscribeResponseData,
	UsersUpdateResponse,
	UsersUpdateInput,
	UsersUpdateResponseData,
} from "./models";

export type UserRole = "admin" | "user";

export const WUNDERGRAPH_S3_ENABLED = false;
export const WUNDERGRAPH_AUTH_ENABLED = false;

export const defaultClientConfig: ClientConfig = {
	applicationHash: "b210d7fd",
	baseURL: "http://localhost:9991",
	sdkVersion: "0.134.0",
};

export const operationMetadata: OperationMetadata = {
	Alldrugs: {
		requiresAuthentication: false,
	},
	CreateUser: {
		requiresAuthentication: false,
	},
	Dragons: {
		requiresAuthentication: false,
	},
	Login: {
		requiresAuthentication: false,
	},
	newDrug: {
		requiresAuthentication: false,
	},
	"users/get": {
		requiresAuthentication: false,
	},
	"users/subscribe": {
		requiresAuthentication: false,
	},
	"users/update": {
		requiresAuthentication: false,
	},
};

export class WunderGraphClient extends Client {
	query<
		OperationName extends Extract<keyof Operations["queries"], string>,
		Input extends Operations["queries"][OperationName]["input"] = Operations["queries"][OperationName]["input"],
		Data extends Operations["queries"][OperationName]["data"] = Operations["queries"][OperationName]["data"]
	>(options: OperationName extends string ? OperationRequestOptions<OperationName, Input> : OperationRequestOptions) {
		return super.query<OperationRequestOptions, Data>(options);
	}
	mutate<
		OperationName extends Extract<keyof Operations["mutations"], string>,
		Input extends Operations["mutations"][OperationName]["input"] = Operations["mutations"][OperationName]["input"],
		Data extends Operations["mutations"][OperationName]["data"] = Operations["mutations"][OperationName]["data"]
	>(options: OperationName extends string ? OperationRequestOptions<OperationName, Input> : OperationRequestOptions) {
		return super.mutate<OperationRequestOptions, Data>(options);
	}
	subscribe<
		OperationName extends Extract<keyof Operations["subscriptions"], string>,
		Input extends Operations["subscriptions"][OperationName]["input"] = Operations["subscriptions"][OperationName]["input"],
		Data extends Operations["subscriptions"][OperationName]["data"] = Operations["subscriptions"][OperationName]["data"]
	>(
		options: OperationName extends string
			? SubscriptionRequestOptions<OperationName, Input>
			: SubscriptionRequestOptions,
		cb: SubscriptionEventHandler<Data>
	) {
		return super.subscribe(options, cb);
	}
	public login(authProviderID: Operations["authProvider"], redirectURI?: string) {
		return super.login(authProviderID, redirectURI);
	}
	public async fetchUser<TUser extends User = User<UserRole>>(options?: FetchUserRequestOptions) {
		return super.fetchUser<TUser>(options);
	}
}

export const createClient = (config?: CreateClientConfig) => {
	return new WunderGraphClient({
		...defaultClientConfig,
		...config,
		operationMetadata,
		csrfEnabled: false,
	});
};

export type Queries = {
	Alldrugs: {
		input?: undefined;
		data: AlldrugsResponseData;
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	Dragons: {
		input?: undefined;
		data: DragonsResponseData;
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"users/get": {
		input: UsersGetInput;
		data: UsersGetResponseData;
		requiresAuthentication: false;
		liveQuery: boolean;
	};
};

export type Mutations = {
	CreateUser: {
		input: CreateUserInput;
		data: CreateUserResponseData;
		requiresAuthentication: false;
	};
	Login: {
		input: LoginInput;
		data: LoginResponseData;
		requiresAuthentication: false;
	};
	newDrug: {
		input?: undefined;
		data: NewDrugResponseData;
		requiresAuthentication: false;
	};
	"users/update": {
		input: UsersUpdateInput;
		data: UsersUpdateResponseData;
		requiresAuthentication: false;
	};
};

export type Subscriptions = {
	"users/subscribe": {
		input: UsersSubscribeInput;
		data: UsersSubscribeResponseData;
		requiresAuthentication: false;
	};
};

export type LiveQueries = {
	Alldrugs: {
		input?: undefined;
		data: AlldrugsResponseData;
		liveQuery: true;
		requiresAuthentication: false;
	};
	Dragons: {
		input?: undefined;
		data: DragonsResponseData;
		liveQuery: true;
		requiresAuthentication: false;
	};
	"users/get": {
		input: UsersGetInput;
		data: UsersGetResponseData;
		liveQuery: true;
		requiresAuthentication: false;
	};
};

export interface Operations extends OperationsDefinition<Queries, Mutations, Subscriptions, UserRole, {}> {}
