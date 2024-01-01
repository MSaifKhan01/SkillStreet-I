/**
 *@swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - phoneNumber
 *         - name
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         name:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *         email: test@example.com
 *         phoneNumber: '1234567890'
 *         name: Test User
 *         password: testpassword
 *     Note:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         title:
 *           type: string
 *         content:
 *           type: string
 *       example:
 *         title: Test Note
 *         content: This is a test note content.
 */

/**
 *@swagger
 * /User/Signup:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               msg: User registered successfully
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               msg: Invalid request body
 *       '409':
 *         description: Conflict
 *         content:
 *           application/json:
 *             example:
 *               msg: User already exists. Please login directly.
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               msg: Internal Server Error
 */

/**
 *@swagger
 * /User/Login:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             example:
 *               msg: Login successfully
 *               name: Saif Khan
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTkyYmNiMzY3Y2M0MjZmMzdlMTVmYTUiLCJpYXQiOjE3MDQxMzgzOTQsImV4cCI6MTcwNDE0OTE5NH0.i1qq-J5yIM2tEy4dfNHgset9h-VsTc1PN68wWXYjVXU
 *               UserPresent: <user-data Object>
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               msg: Invalid request body
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             example:
 *               msg: User not found. Please sign up first.
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               msg: Internal Server Error
 */

/**
 *@swagger
 * /Note/Add:
 *   post:
 *     summary: Add a new note
 *     tags:
 *       - Note
 *     security:
 *         - Auth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       '201':
 *         description: Note added successfully
 *         content:
 *           application/json:
 *             example:
 *               msg: Note added successfully
 *               data: <note-data object>
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               msg: Invalid request body
 *       '409':
 *         description: Conflict
 *         content:
 *           application/json:
 *             example:
 *               msg: Note already exists in the DB
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               msg: Internal Server Error
 */

/**
 *@swagger
 * /Note/All-Notes:
 *   get:
 *     summary: Get all notes
 *     tags:
 *       - Note
 *     security:
 *         - Auth: []
 *     responses:
 *       '200':
 *         description: Retrieve all notes
 *         content:
 *           application/json:
 *             example:
 *               - <note-1 object>
 *               - <note-2 object>
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             example:
 *               msg: Notes not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               msg: Internal Server Error
 */

/**
 *@swagger
 * /Note/Single-Note/{id}:
 *   get:
 *     summary: Get a single note
 *     tags:
 *       - Note
 *     security:
 *         - Auth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the note to get
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Retrieve a single note
 *         content:
 *           application/json:
 *             example:
 *               - <note-data object>
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             example:
 *               msg: Note not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               msg: Internal Server Error
 */

/**
 *@swagger
 * /Note/Update-Note/{id}:
 *   put:
 *     summary: Update a note
 *     tags:
 *       - Note
 *     security:
 *         - Auth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the note to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       '200':
 *         description: Note data updated
 *         content:
 *           application/json:
 *             example:
 *               msg: Note data updated
 *               UpdateData: <updated-note-data>
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               msg: Invalid request body
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             example:
 *               msg: Note not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               msg: Internal Server Error
 */

/**
 *@swagger
 * /Note/Delete-Note/{id}:
 *   delete:
 *     summary: Delete a note
 *     tags:
 *       - Note
 *     security:
 *         - Auth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the note to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Note deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               msg: Note deleted successfully
 *               DeleteNote: <deleted-note-data>
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             example:
 *               msg: Note not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               msg: Internal Server Error
 */
