CREATE TABLE executors (
    executor_id SERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL
);

CREATE TABLE projects (
    project_id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK(status = 'not_started' OR status = 'in_progress' OR status = 'completed'),
    executor_id INT REFERENCES executors(executor_id)
);

CREATE TABLE architects (
    architector_id SERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    license VARCHAR(150) NOT NULL
);

CREATE TABLE projects_architects (
    project_id INT REFERENCES projects(project_id),
    architector_id INT REFERENCES architects(architector_id)
);

-- fill in executors table
insert into executors (first_name, last_name, email) values ('Jordanna', 'Scotchmer', 'jscotchmer0@aol.com');
insert into executors (first_name, last_name, email) values ('Gerrard', 'Dickerson', 'gdickerson1@meetup.com');
insert into executors (first_name, last_name, email) values ('Tomkin', 'Planks', 'tplanks2@omniture.com');
insert into executors (first_name, last_name, email) values ('Raymund', 'Guitton', 'rguitton3@timesonline.co.uk');
insert into executors (first_name, last_name, email) values ('Tamar', 'Bernaldez', 'tbernaldez4@weather.com');
insert into executors (first_name, last_name, email) values ('Obediah', 'Brauns', 'obrauns5@tuttocitta.it');
insert into executors (first_name, last_name, email) values ('Obed', 'Presnell', 'opresnell6@ebay.co.uk');
insert into executors (first_name, last_name, email) values ('Janessa', 'Bengoechea', 'jbengoechea7@miibeian.gov.cn');
insert into executors (first_name, last_name, email) values ('Lotti', 'Duxbarry', 'lduxbarry8@bigcartel.com');
insert into executors (first_name, last_name, email) values ('Veronica', 'Rockcliff', 'vrockcliff9@geocities.jp');

-- fill in projects table
insert into projects (name, status, executor_id) values ('House #1', 'completed', 1);
insert into projects (name, status, executor_id) values ('Comedy House', 'not_started', 1);
insert into projects (name, status, executor_id) values ('Documentary Apartaments', 'in_progress', 2);
insert into projects (name, status, executor_id) values ('Museum of National history', 'not_started', 4);
insert into projects (name, status, executor_id) values ('House #2', 'completed', 4);
insert into projects (name, status, executor_id) values ('House #3', 'in_progress', 4);
insert into projects (name, status, executor_id) values ('Cinema Hall | Section A', 'not_started', 7);
insert into projects (name, status, executor_id) values ('House #4', 'completed', 8);
insert into projects (name, status, executor_id) values ('Theatre | Section B', 'in_progress', 9);
insert into projects (name, status, executor_id) values ('Theatre | Section C', 'not_started', 9);

-- fill in architects table
insert into architects (first_name, last_name, email, license) values ('Cullie', 'Sinnatt', 'csinnatt0@cargocollective.com', 'c96ab2e8-40a2-4f29-836d-65be116f922f');
insert into architects (first_name, last_name, email, license) values ('Sloan', 'Connealy', 'sconnealy1@usgs.gov', '0f5c889b-4c27-4c34-8b68-e7d5334a0122');
insert into architects (first_name, last_name, email, license) values ('Dierdre', 'Balffye', 'dbalffye2@t-online.de', 'dfbddae4-5eca-4f25-903a-6a05a6dc53a0');
insert into architects (first_name, last_name, email, license) values ('Gnni', 'Croal', 'gcroal3@cam.ac.uk', '7fa06a09-d24c-4209-8a9b-c693547cf135');
insert into architects (first_name, last_name, email, license) values ('Ardyth', 'Fishby', 'afishby4@marriott.com', '4810c967-1fe2-4b82-8cee-879326c38cfa');

-- fill in projects_architects table
insert into projects_architects (project_id, architector_id) values (1, 1);
insert into projects_architects (project_id, architector_id) values (1, 2);
insert into projects_architects (project_id, architector_id) values (2, 1);
insert into projects_architects (project_id, architector_id) values (2, 2);
insert into projects_architects (project_id, architector_id) values (2, 3);
insert into projects_architects (project_id, architector_id) values (3, 1);
insert into projects_architects (project_id, architector_id) values (4, 4);
insert into projects_architects (project_id, architector_id) values (5, 5);
insert into projects_architects (project_id, architector_id) values (6, 5);
insert into projects_architects (project_id, architector_id) values (6, 1);
insert into projects_architects (project_id, architector_id) values (7, 5);
insert into projects_architects (project_id, architector_id) values (8, 2);
insert into projects_architects (project_id, architector_id) values (9, 2);
insert into projects_architects (project_id, architector_id) values (10, 3);