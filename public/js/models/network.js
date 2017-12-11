angular
	.module(config.nameRoute)
	.factory('appNetwork', ['$http', function($http)
	{
		var request = function(params)
		{
			try
			{
				//
				if (params == null || (typeof(params.url) != 'string' && typeof(params) != 'string')) {
					throw ('appNetwork => request => invalide parameters');
				}

				//
				params = (typeof(params) == 'string' ? {url: params} : params);

				//
				var paramsRequest = {
					url: params.url,
					method: ((typeof(params.method) == 'string') ? (params.method) : ('GET')),
					headers: {
						'Content-Type': ((typeof(params.contenttype) == 'string') ? (params.contenttype) : ('application/json')),
						'Authorization': ((typeof(params.authorization) == 'string') ? (params.authorization) : ('')), 
					},
				 	data: ((typeof(params.data) == 'object') ? (jQuery.param(params.data)) : ((typeof(params.data) == 'string') ? (params.data) : (''))),
				};

				// 
				var sendRequest = $http(paramsRequest);
				var toReturn = {
					success: function(func)
					{
						if (typeof(func) == 'function') {
							sendRequest.then(function(data) {
								func(data.data, data.config);
							});
						}
						return toReturn;
					},
					error: function(func)
					{
						if (typeof(func) == 'function') {
							sendRequest.then(null, function(data) {
								func(data, data.config);
							});
						}
						return toReturn;
					},
				};
				return toReturn;

			} catch (e) {
				var toReturn = {
					success: function(func)
					{
						return toReturn;
					},
					error: function(func)
					{
						if (typeof(func) == 'function') {
							func({
								errno: 500,
								message: e,
							}, params);
						}
						return toReturn;
					},
				};
				return toReturn;
			}
		}

		var $extend = function(obj, obj2)
		{
			if (typeof(obj2) != 'object') {
				return obj;
			}
			for (var index in obj2) {
				obj[index] = obj2[index];
			}
			return obj2;
		}

		return {
			request: request,
			get: function(url, params) {
				return request($extend({
					url: url,
					method: 'GET',
				}, params));
			},
			post: function(url, params) {
				return request($extend({
					url: url,
					method: 'POST',
				}, params));
			},
			delete: function(url, params) {
				return request($extend({
					url: url,
					method: 'DELETE',
				}, params));
			},
			put: function(url, params) {
				return request($extend({
					url: url,
					method: 'PUT',
				}, params));
			},
		}
	}])
;
