$redis = Redis::Namespace.new 'demo-redis', redis: Redis.new

$redis_onlines = Redis.new

$redis_counter_access = Redis::Namespace.new 'counter-redis', redis: Redis.new

$redis_chat = Redis::Namespace.new 'chat-redis', redis: Redis.new
