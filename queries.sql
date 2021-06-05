/* Get all categories */
SELECT id, category FROM categories;

/* Get categories which belongs to one or more articles */
SELECT c.id, c.category FROM categories AS c INNER JOIN articles_categories AS ac ON c.id = ac.category_id;

/* Get category count belonging to each article */
SELECT c.category, c.id, COUNT(c.id) from articles AS a
	INNER JOIN articles_categories AS ac ON ac.article_id = a.id
	INNER JOIN categories AS c on c.id = ac.category_id
	GROUP BY c.id, c.category

SELECT art.*, u.first_name, u.last_name, u.email, c.category FROM users AS u INNER JOIN (
	SELECT 
		a.id AS article_id,
		a.title,
		a.ads,
		a.full_text,
		a.user_id,	
		COUNT(a.id) AS comments_count,
		a.created_at
	FROM articles AS a
	INNER JOIN users AS u ON a.user_id = u.id
	INNER JOIN comments AS cm ON cm.article_id = a.id
	GROUP BY a.id
) AS art ON u.id = art.user_id
INNER JOIN articles_categories AS ac ON ac.article_id = art.article_id
INNER JOIN categories c ON c.id = ac.category_id
ORDER BY art.created_at DESC;

SELECT art.*, u.first_name, u.last_name, u.email, c.category FROM users AS u INNER JOIN (
	SELECT 
		a.id AS article_id,
		a.title,
		a.ads,
		a.full_text,
		a.user_id,	
		COUNT(a.id) AS comments_count,
		a.created_at,
		a.picture
	FROM articles AS a
	INNER JOIN users AS u ON a.user_id = u.id
	INNER JOIN comments AS cm ON cm.article_id = a.id
	WHERE a.id = 1
	GROUP BY a.id
) AS art ON u.id = art.user_id
INNER JOIN articles_categories AS ac ON ac.article_id = art.article_id
INNER JOIN categories c ON c.id = ac.category_id
ORDER BY art.created_at DESC;

SELECT c.id, c.article_id, u.first_name, u.last_name, c.full_text FROM comments AS c
	INNER JOIN users AS u ON u.id = c.user_id
	ORDER BY c.created_at DESC
	LIMIT 5;


SELECT c.id, c.article_id, u.first_name, u.last_name, c.full_text FROM comments AS c
	INNER JOIN users AS u ON u.id = c.user_id
	WHERE c.article_id = 1
	ORDER BY c.created_at DESC;

UPDATE articles SET title = 'Как я встретил Новый год' WHERE articles.id = 1