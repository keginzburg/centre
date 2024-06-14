json.follow do
    json.extract! @follow, :id, :follower_id, :user_id, :created_at, :updated_at
end

json.follower do
    json.extract! @follow.follower, :id, :email, :name
    json.articleIds @follow.follower.article_ids
    json.followerIds @follow.follower.follower_ids
    json.followingIds @follow.follower.following_ids
    json.photoUrl @follow.follower.photo.attached? ? @follow.follower.photo.url : "https://centre-seeds.s3.amazonaws.com/users/demo.png"
end

json.leader do
    json.extract! @follow.leader, :id, :email, :name
    json.articleIds @follow.leader.article_ids
    json.followerIds @follow.leader.follower_ids
    json.followingIds @follow.leader.following_ids
    json.photoUrl @follow.leader.photo.attached? ? @follow.leader.photo.url : "https://centre-seeds.s3.amazonaws.com/users/demo.png"
end