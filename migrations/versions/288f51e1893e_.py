"""empty message

Revision ID: 288f51e1893e
Revises: 
Create Date: 2021-05-04 16:01:40.920316

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '288f51e1893e'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('userinfo',
    sa.Column('id', sa.BigInteger(), nullable=False),
    sa.Column('username', sa.String(length=20), nullable=False),
    sa.Column('password_salt_hash', sa.String(length=500), nullable=False),
    sa.Column('salt_key', sa.String(length=20), nullable=False),
    sa.Column('email', sa.String(length=50), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('userposts',
    sa.Column('postid', sa.BigInteger(), nullable=False),
    sa.Column('username', sa.String(length=20), nullable=False),
    sa.Column('posts', sa.String(length=5000), nullable=True),
    sa.Column('postdate', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.Column('sessionid', sa.String(length=300), nullable=True),
    sa.PrimaryKeyConstraint('postid')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('userposts')
    op.drop_table('userinfo')
    # ### end Alembic commands ###
