// server.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // 引入 cors 模块

const app = express();
const port = 3001;

app.use(cors({
    origin: 'http://localhost:5173', // 允许来自这个源的请求. Vue默认5173, React默认3000
    credentials: true // 如果需要发送 cookies，设置为 true
  }));

// 使用内置的json中间件来解析JSON格式的请求体
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'message_board'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database!');
});

// 查询留言
app.get('/api/data', (req, res) => {
  //
  // console.log("查询留言");

  const sql = 'SELECT * FROM note ORDER BY date DESC';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// 首页留言列表数据
var comments= {"comments":[]}

// 添加留言
app.post('/api/addnote', (req, res) => {
  //
  // console.log("添加留言");

  const receivedData = req.body;
  console.log(receivedData)

  const comment=receivedData;
  let now_date = new Date();
  now_date.setHours(now_date.getHours() + 8); // 使用北京时间

  let s1 = now_date.toISOString()
  let s1_len19 = s1.slice(0, 19);
  let s2 = s1.slice(0, 10);
  comment.datetime=s2;

  comments.comments.unshift(comment);

  // 写入数据库
  s_name = receivedData["name"]
  s_message = receivedData["message"]

  
  if(s_name!=undefined && s_message!=undefined){
    if(s_message.length<=0){
      console.log('s_message为空，不执行插入')
    }else{ // s_message.length>0
      let sqlStr =  "INSERT INTO note (user, content, date)VALUES(\'"+s_name+"\',\'"+s_message+"\',\'"+s1_len19+"\')"
      db.query(sqlStr,(err)=>{
        if(err!=null){
          console.log(err);
        }
        // console.log(err,'如果为null，sql语句执行成功')
      })
    }
  }else{
    console.log('s_name或者s_message为undefined，不执行插入')
  }

  try{
    // 返回状态码200来表示成功
    res.status(200).json({
      message: 'Request processed successfully'
    });
  }catch(error){
    console.log("ERROR on res.status(200)")
  }
});

// // 假设有一个连接到数据库的方法
// const deleteNoteFromDB = async (id) => {
//   // 这里应该是与数据库交互的代码
//   // 返回 true 表示删除成功，false 表示删除失败
//   // 示例：
//   // return await db.collection('notes').deleteOne({ id }).then(result => result.deletedCount > 0);
//   const sql = 'DELETE FROM note WHERE id = '+id+';';
//   return await db.query(sql, (err, results) => {
//     if (err) throw err;
//     res.json(results);
//   });
// };

// 删除留言
app.post('/api/delnote', async (req, res) => {
  // console.log("删除留言");

  const receivedData = req.body;
  // console.log(receivedData); // { id: 41 }

  try {
    // 确保请求体中包含 id
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: '缺少必要的参数 id' });
    }

    // 从数据库中删除留言
    const sql = 'DELETE FROM note WHERE id = '+id+';';
    await db.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});


app.listen(port, () => {
  console.log("Server running at http://localhost:" + port);
});
