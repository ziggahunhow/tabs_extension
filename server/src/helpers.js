export const checkUserLogin = req => {
  if (!req.me) throw new Error('Authentication failed');
  if (req.me.id !== req.body.uid) throw new Error('Permission Failed');
};
