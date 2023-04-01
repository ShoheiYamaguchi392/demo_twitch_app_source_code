export const Status = {
	Ok: 200,
	Created: 201,
	NoContent: 204,
	BatRequest: 400,
	Unauthorized: 401,
	Forbidden: 403,
	NotFount: 404,
	Timeout: 408,
	Conflict: 409,
	PayloadTooLarge: 413,
	TooManyRequest: 429,
} as const;

export const DefaultMessage = {
	[Status.Ok]: '正常に処理されました',
	[Status.Created]: 'リソースが作成されました',
	[Status.NoContent]: '正常に処理されました',
	[Status.BatRequest]: 'リクエストが正しくありません',
	[Status.Unauthorized]: '認証されていません',
	[Status.Forbidden]: '許可されていない操作です',
	[Status.NotFount]: 'リソースが見つかりません',
	[Status.Timeout]: 'タイムアウトしました',
	[Status.Conflict]: '同じリソースが存在します',
	[Status.PayloadTooLarge]: 'リクエストが大きすぎます',
};
