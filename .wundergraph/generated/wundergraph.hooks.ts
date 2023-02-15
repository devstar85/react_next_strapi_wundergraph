// Code generated by wunderctl. DO NOT EDIT.

import { AlldrugsResponse, DragonsResponse, NewDrugResponse } from "./models";
import type {
	BaseRequestContext,
	WunderGraphRequest,
	WunderGraphResponse,
	AuthenticationResponse,
	AuthenticationHookRequest,
	HooksConfiguration,
	WsTransportOnConnectionInitResponse,
	PreUploadHookRequest,
	PreUploadHookResponse,
	PostUploadHookRequest,
	PostUploadHookResponse,
} from "@wundergraph/sdk/server";
import type { InternalClient } from "./wundergraph.internal.client";
import type { User } from "./wundergraph.server";

// use SKIP to skip the hook and continue the request / response chain without modifying the request / response
export type SKIP = "skip";

// use CANCEL to skip the hook and cancel the request / response chain
// this is semantically equal to throwing an error (500)
export type CANCEL = "cancel";

export type WUNDERGRAPH_OPERATION = "Alldrugs" | "Dragons" | "NewDrug";

export type DATA_SOURCES = never;

export interface HttpTransportHookRequest extends BaseRequestContext<User, InternalClient> {
	request: WunderGraphRequest;
	operation: {
		name: WUNDERGRAPH_OPERATION;
		type: "mutation" | "query" | "subscription";
	};
}
export interface HttpTransportHookRequestWithResponse extends BaseRequestContext<User, InternalClient> {
	response: WunderGraphResponse;
	operation: {
		name: string;
		type: string;
	};
}
export interface WsTransportHookRequest extends BaseRequestContext<User, InternalClient> {
	dataSourceId: DATA_SOURCES;
	request: WunderGraphRequest;
}
export interface GlobalHooksConfig {
	httpTransport?: {
		// onRequest is called right before the request is sent to the origin
		// it can be used to modify the request
		// you can return SKIP to skip the hook and continue the request chain without modifying the request
		// you can return CANCEL to cancel the request chain and return a 500 error
		onOriginRequest?: {
			hook: (hook: HttpTransportHookRequest) => Promise<WunderGraphRequest | SKIP | CANCEL>;
			// calling the httpTransport hooks has a case, because the custom httpTransport hooks have to be called for each request
			// for this reason, you have to explicitly enable the hook for each Operation
			enableForOperations?: WUNDERGRAPH_OPERATION[];
			// enableForAllOperations will disregard the enableForOperations property and enable the hook for all operations
			enableForAllOperations?: boolean;
		};
		// onResponse is called right after the response is received from the origin
		// it can be used to modify the response
		// you can return SKIP to skip the hook and continue the response chain without modifying the response
		// you can return CANCEL to cancel the response chain and return a 500 error
		onOriginResponse?: {
			hook: (hook: HttpTransportHookRequestWithResponse) => Promise<WunderGraphResponse | SKIP | CANCEL>;
			// calling the httpTransport hooks has a case, because the custom httpTransport hooks have to be called for each request
			// for this reason, you have to explicitly enable the hook for each Operation
			enableForOperations?: WUNDERGRAPH_OPERATION[];
			// enableForAllOperations will disregard the enableForOperations property and enable the hook for all operations
			enableForAllOperations?: boolean;
		};
	};
	wsTransport?: {
		// onConnectionInit is used to populate 'connection_init' message payload with custom data
		// it can be used to authenticate the websocket connection
		onConnectionInit?: {
			hook: (hook: WsTransportHookRequest) => Promise<WsTransportOnConnectionInitResponse>;
			/**
			 * enableForDataSources will enable the hook for specific data sources.
			 * you should provide a list of data sources ids
			 * an id is the identifier of the data source in the wundergraph.config.ts file
			 * @example
			 *const chat = introspect.graphql({
			 *	id: 'chatId',
			 *	apiNamespace: 'chat',
			 *	url: 'http://localhost:8085/query',
			 *});
			 */
			enableForDataSources: DATA_SOURCES[];
		};
	};
}

export type JSONValue = string | number | boolean | JSONObject | Array<JSONValue>;

export type JSONObject = { [key: string]: JSONValue };

export interface HookRequest extends BaseRequestContext<User, InternalClient> {}

export interface HookRequestWithResponse<Response> extends HookRequest {
	response: Response;
}

export interface HookRequestWithInput<Input> extends HookRequest {
	input: Input;
}

export interface HooksConfig
	extends HooksConfiguration<Queries, Mutations, Subscriptions, Uploads, User, InternalClient> {
	global?: GlobalHooksConfig;
	authentication?: {
		postAuthentication?: (hook: AuthenticationHookRequest<User, InternalClient>) => Promise<void>;
		mutatingPostAuthentication?: (
			hook: AuthenticationHookRequest<User, InternalClient>
		) => Promise<AuthenticationResponse<User>>;
		revalidate?: (hook: AuthenticationHookRequest<User, InternalClient>) => Promise<AuthenticationResponse<User>>;
		postLogout?: (hook: AuthenticationHookRequest<User, InternalClient>) => Promise<void>;
	};
	queries?: Queries;
	mutations?: Mutations;
}

export interface Queries {
	Alldrugs?: {
		mockResolve?: (hook: HookRequest) => Promise<AlldrugsResponse>;
		preResolve?: (hook: HookRequest) => Promise<void>;

		postResolve?: (hook: HookRequest & HookRequestWithResponse<AlldrugsResponse>) => Promise<void>;
		customResolve?: (hook: HookRequest) => Promise<void | AlldrugsResponse>;
		mutatingPostResolve?: (hook: HookRequest & HookRequestWithResponse<AlldrugsResponse>) => Promise<AlldrugsResponse>;
	};
	Dragons?: {
		mockResolve?: (hook: HookRequest) => Promise<DragonsResponse>;
		preResolve?: (hook: HookRequest) => Promise<void>;

		postResolve?: (hook: HookRequest & HookRequestWithResponse<DragonsResponse>) => Promise<void>;
		customResolve?: (hook: HookRequest) => Promise<void | DragonsResponse>;
		mutatingPostResolve?: (hook: HookRequest & HookRequestWithResponse<DragonsResponse>) => Promise<DragonsResponse>;
	};
}

export interface Mutations {
	NewDrug?: {
		mockResolve?: (hook: HookRequest) => Promise<NewDrugResponse>;
		preResolve?: (hook: HookRequest) => Promise<void>;

		postResolve?: (hook: HookRequest & HookRequestWithResponse<NewDrugResponse>) => Promise<void>;
		customResolve?: (hook: HookRequest) => Promise<void | NewDrugResponse>;
		mutatingPostResolve?: (hook: HookRequest & HookRequestWithResponse<NewDrugResponse>) => Promise<NewDrugResponse>;
	};
}

export interface Subscriptions {}

export interface Uploads {}
