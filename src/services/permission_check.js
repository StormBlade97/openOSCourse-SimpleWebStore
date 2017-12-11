export default async (ctx, next) => {
    if (!ctx.state.user) {
        ctx.status = 401
        ctx.body = 'You must be authorized to use this route'
        return
    }
    if (!/^(staff|admin)$/.test(ctx.state.user.privilege)) {
        ctx.status = 403
        ctx.body = 'Only admin or staff personnel can have access'
        return
    }
    await next(ctx)
}
