import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { decode, sign, verify } from 'hono/jwt'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createPostInput, signupInput,signinInput, updatePostInput } from 'zod-module'
import { cors } from 'hono/cors'
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string,
	},
  Variables:{
    userId:string,
    useremail:string
  }
}>()
app.use(cors())
app.use("/api/v1/blog/*", async (c, next) => {
  const jwt = c.req.header("Authorization");
  if(!jwt){
    c.status(401);
    return c.json({message:"Not authenticated"});
  }
  const token = jwt.split(' ')[1];
  const payload = await verify(token, c.env.JWT_SECRET);
  if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
  c.set('userId', payload.id);
  c.set('useremail', payload.email);
	await next();
});

app.post('/api/v1/signup', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
    const {email,password,name}=await c.req.json();
    const { success } = signupInput.safeParse({email:email,name:name,password:password});
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}
    const body = await c.req.json();
    try {
      const user = await prisma.user.create({
        data: {
          email:email,
          password: password,
          name:name
        }
      });
      const jwt = await sign({ id: user.id,email:user.email,name:user.name }, c.env.JWT_SECRET);
      return c.json({success:true, token:jwt });
    } catch(e) {
      console.log(e)
      c.status(403);
      return c.json({success:false, error: "error while signing up" });
    }
  }
    )
app.post('/api/v1/signin', async(c) => {
  const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}
	const user = await prisma.user.findUnique({
		where: {
			email: body.email
		}
	});

	if (!user) {
		c.status(403);
		return c.json({success:false, error: "user not found" });
	}

	const jwt = await sign({ id: user.id,email:user.email,name:user.name }, c.env.JWT_SECRET);
	return c.json({success:true, token:jwt });
})

app.post("/api/v1/blog", async (c) => {
  const userId = c.get("userId");
  const useremail = c.get("useremail");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = createPostInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      author: { connect: { id: userId } },
    },
  });
  if (blog) {
    c.status(200);
    return c.json(blog);
  } else {
    c.json({ success:false, error: "Insert Fail" });
  }
});

app.put('/api/v1/blog/:id', async(c) => {
  const id = c.req.param('id');
  const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = updatePostInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}

  const post= await prisma.post.update({
    where:{
      id:id
    },
    data:{
      title:body.title,
      content:body.content
    }
  })
  if(post){
    c.status(200);
    return c.json({success:true,message:"Updated Successfully"});
  }
  else{
    c.status(401);
    c.json({
      success:false,
      message:"Error"
    })
  }
})
app.get('/api/v1/blog', async(c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());
  const posts = await prisma.post.findMany({
    where: {
      author: {
        id: userId
      }
    }
  });
  return c.json({success:true,posts:posts})
})

export default app
